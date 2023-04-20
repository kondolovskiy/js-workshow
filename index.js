const API_URL = 'https://dummyjson.com/products';

const productsContainer = document.getElementById('product-list');
const categoriesList = document.getElementById('categories-list');

const categories = [];

let products = [];

function createCard(product) {
    const card = document.createElement('div');
    card.classList.add('card');

    // create card image
    const cardImage = document.createElement('img');
    cardImage.classList.add('card-img-top');
    cardImage.src = product.thumbnail;

    // create card body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // create card title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.innerText = product.title;

    // create card text
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.innerText = product.description;

    // create card price
    const cardPrice = document.createElement('p');
    cardPrice.classList.add('card-price');
    cardPrice.innerText = product.price;

    // create card button
    const cardButton = document.createElement('a');
    cardButton.classList.add('btn', 'btn-primary');
    cardButton.href = `product.html?id=${product.id}`;
    cardButton.innerText = 'View Product';

    // append all elements to card body
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(cardButton);

    // append card image and body to card
    card.appendChild(cardImage);
    card.appendChild(cardBody);

    return card;
}

function createMessageBox(message, type = 'success') {
    const cl = `alert-${type}`;
    const errorMessageBox = document.createElement('div');
    errorMessageBox.classList.add('alert', cl);
    errorMessageBox.innerText = message;

    return errorMessageBox;
}


function handleLoaded() {
    const loader = document.querySelector('.loader');
    loader.classList.add('hidden');
}

function createCategoriesList(products) {
    const categories = products.map(product => product.category);
    const uniqueCategories = [...new Set(categories)];

    uniqueCategories.forEach(category => {
        const categoryItem = document.createElement('li');
        categoryItem.classList.add('nav-item');

        const categoryLink = document.createElement('a');
        categoryLink.classList.add('nav-link');
        categoryLink.href = '#';
        categoryLink.innerText = category;

        categoryItem.appendChild(categoryLink);
        categoriesList.appendChild(categoryItem);
    });
}

categoriesList.addEventListener('click', event => {
    event.preventDefault();

    const category = event.target.innerText;
    const filteredProducts = products.filter(product => product.category === category);

    productsContainer.innerHTML = '';

    if (!filteredProducts.length) {
        const errorMessageBox = createMessageBox('Товари відсутні');
        productsContainer.appendChild(errorMessageBox, 'success');
    }

    filteredProducts.forEach(product => {
        const card = createCard(product);
        productsContainer.appendChild(card);
    });
});

function getProducts() {
  return fetch(API_URL)
    .then(response => {
        handleLoaded();
        if (!response.ok) {
            throw new Error('Невдалось завантажити товари. Спробуйте пізніше');
        }

        return response.json()
    })
    .then(({ products: p }) => {

        products = p;

        if (!products.length) {
            const errorMessageBox = createMessageBox('Товари відсутні');
            productsContainer.appendChild(errorMessageBox, 'success');
        }

        products.forEach(product => {
            const card = createCard(product);
            productsContainer.appendChild(card);
        });

        createCategoriesList(products);
    })
    .catch(error => {
        const errorMessageBox = createMessageBox(error.message);
        productsContainer.appendChild(errorMessageBox, 'error');
    })
}

getProducts();
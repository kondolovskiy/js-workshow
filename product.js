const titleEl = document.querySelector('.card-title');
const descriptionEl = document.querySelector('.card-text');
const carouselEl = document.querySelector('.carousel-inner');

const btnPrevEl = document.querySelector('.carousel-control-prev');
const btnNextEl = document.querySelector('.carousel-control-next');

const cardEl = document.querySelector('.card');
const loaderEl = document.querySelector('.loader');

const product = new Product(getIdFromUrl());

function renderImages() {
    const images = document.querySelectorAll('.carousel-item');

    images.forEach((image, index) => {
        if (index === product.activeImageIndex) {
            image.classList.add('active');
        } else {
            image.classList.remove('active');
        }
    });
}

btnPrevEl.addEventListener('click', () => {
    product.setActiveImageIndex(product.activeImageIndex - 1);
    renderImages();
});

btnNextEl.addEventListener('click', () => {
    product.setActiveImageIndex(product.activeImageIndex + 1);
    renderImages();
});

function createCarouseleItem(image, isActive = false) {
    const item = document.createElement('div');
    item.classList.add('carousel-item');
    if (isActive) {
        item.classList.add('active');
    }

    const img = document.createElement('img');
    img.classList.add('d-block', 'w-100');
    img.src = image;

    item.appendChild(img);

    carouselEl.appendChild(item);
}

function getIdFromUrl() {
    const params = new URL(document.location).searchParams;

    return params.get('id');
}

async function getProduct() {
    await product.getProduct();

    loaderEl.classList.add('hidden');
    cardEl.classList.remove('hidden');

    titleEl.innerText = product.title;
    descriptionEl.innerText = product.description;

    product.images.forEach((image, index) => {
        createCarouseleItem(image, index === 0)
    });
}

getProduct()
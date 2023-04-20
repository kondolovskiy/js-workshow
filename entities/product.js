const API_URL = 'https://dummyjson.com/products';

class Product {
    constructor(id) {
        this.id = id;
        this.activeImageIndex = 0;
    }

    async getProduct() {
        const response = await fetch(`${API_URL}/${this.id}`);
        const product = await response.json();
    
        this.title = product.title;
        this.description = product.description;
        this.images = product.images;
    }

    setActiveImageIndex(index) {
        if(index < 0) {
            this.activeImageIndex = this.images.length - 1;
        } else if (index >= this.images.length) {
            this.activeImageIndex = 0;
        } else {
            this.activeImageIndex = index;
        }
    }
}
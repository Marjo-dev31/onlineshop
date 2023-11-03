const db = require('../data/database');

class Product {
    constructor(productData) {
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = +productData.price; /*le + force a enrgister en chiffre*/
        this.description = productData.description;
        this.image = productData.image;
        this.imagePath = `product-data/images/${productData.image}`;
        this.imageUrl = `/products/assests/images/${productData.image}`;
        if (productData._id) {
            this.id = productData._id.toString();
        }
    };

    static async findAll() {
        const products = await db.getDb().collection('products').find().toArray();

        return products.map(function(productDocument) {
            return new Product(productDocument);
        }); 
        /*to array transforme la liste complete des produits en array et map redetaille chaque product à la forme de class Product*/ 
    };

    async save() {
        const productData = {
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image
        };

        await db.getDb().collection('products').insertOne(productData)
    }
};

module.exports = Product
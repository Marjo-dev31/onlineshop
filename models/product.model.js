const mongodb = require('mongodb');

const db = require('../data/database');

class Product {
    constructor(productData) {
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = +productData.price; /*le + force a enregister en chiffre*/
        this.description = productData.description;
        this.image = productData.image;
        this.updateImageData();
        if (productData._id) {
            this.id = productData._id.toString();
        }
    };

    static async findById(productId) {
        let prodId;
        try {
            prodId = new mongodb.ObjectId(productId);
        } catch (error) {
            error.code = 404;
            throw error;
        };

        const product = await db.getDb().collection('products').findOne({ _id: prodId });
        if (!product) {
            const error = new Error('Could not find product with provided id.');
            error.code = 404;
            throw error;
        };

        return new Product(product);
    };


    static async findAll() {
        const products = await db.getDb().collection('products').find().toArray();

        return products.map(function (productDocument) {
            return new Product(productDocument);
        });
        /*to array transforme la liste complete des produits en array et map redetaille chaque product à la forme de class Product*/
    };

    updateImageData() {
        this.imagePath = `product-data/images/${this.image}`;
        this.imageUrl = `/products/assests/images/${this.image}`;
    }

    async save() {
        const productData = {
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image
        };

        if (this.id) {
            const productId = new mongodb.ObjectId(this.id);

            if(!this.image) {
                delete productData.image
            };

        db.getDb().collection('products').updateOne({ _id: productId}, {$set: productData})
        } else {
            await db.getDb().collection('products').insertOne(productData)
        }
    }

    async replaceImage(newImage) {
        this.image = newImage;
        this.updateImageData();
    }

    remove() {
        const productId = new mongodb.ObjectId(this.id);
        db.getDb().collection('products').deleteOne({_id: productId})
    }

};

module.exports = Product
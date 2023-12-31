const bcrypt = require('bcryptjs');
const mongodb = require('mongodb');
const db = require('../data/database');


class User {
    constructor(email, password, fullname, street, postal, city) {
        this.email = email;
        this.password = password;
        this.name = fullname; /*le premier est au choix, le deuxieme est la variable du constructor*/
        this.address = {
            street: street,
            postalCode: postal,
            city: city
        };
    };

    getUserWithSameEmail() {
        return db.getDb().collection('users').findOne({email: this.email});
    };

    static findById(userId) {
        const uid = new mongodb.ObjectId(userId);

        return db.getDb().collection('users').findOne({_id: uid}, { projection: { password: 0}})
    }

    async existsAlready() {
 const existingUser = await this.getUserWithSameEmail();
 if (existingUser) {
    return true;
 }   
 return false;
};

    async signup() {
        const hashedPassword = await bcrypt.hash(this.password, 12);

        await db.getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword,
            name: this.name, /*le premier est au choix qui correspondra au nom de la collone dans la db*/
            address: this.address
        });
    };

    hasMatchingPassword(hashedPassword) {
        return bcrypt.compare(this.password, hashedPassword) /*compare this.password (le password entré dans le form lors du login) et le password crypté*/
    };
};

module.exports = User;
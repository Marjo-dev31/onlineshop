const bcrypt = require('bcryptjs');

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
    }

    async signup() {
        const hashedPassword = await bcrypt.hash(this.password, 12);

        await db.getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword,
            name: this.name, /*le premier est au choix qui correspondra au nom de la collone dans la db*/
            address: this.address
        });
    }
}

module.exports = User;
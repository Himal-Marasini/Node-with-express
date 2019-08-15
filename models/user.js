const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;


module.exports = class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    static findbyId(id) {
        const db = getDb();
        return db.collection('users').findOne({
                _id: new mongodb.ObjectId(id)
            })
            .then((user) => {
                return user;
            })
            .catch(err => {
                console.error(err);
            });
    }
};
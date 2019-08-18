const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;


module.exports = class User {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(pid => {
            return pid.productId == product._id;
        });

        console.log(cartProductIndex);

        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({
                productId: new mongodb.ObjectID(product._id),
                quantity: 1
            });
        }
        let updatedCart = {
            items: updatedCartItems
        };
        const db = getDb();
        db.collection('users').updateOne({
            _id: new mongodb.ObjectId(this._id)
        }, {
            $set: {
                cart: updatedCart
            }
        });
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
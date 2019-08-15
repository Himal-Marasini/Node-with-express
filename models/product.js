const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {

    this._id = id ? new mongodb.ObjectId(id) : null;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    // this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbop;

    if (this._id) {
      dbop = db.collection('product').updateOne({
        _id: this._id
      }, {
        $set: this
      });
    } else {
      dbop = db.collection('product').insertOne(this);
    }
    return dbop.then(result => {
      return result;
    }).catch(err => {
      console.error(err);
    });
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('product').find().toArray()
      .then((result) => {
        return result;
      })
      .catch(err => {
        console.error(err);
      });
  }

  static findbyId(id) {
    const db = getDb();
    return db.collection('product').find({
        _id: new mongodb.ObjectId(id)
      })
      .next()
      .then(product => {
        return product;
      })
      .catch(err => {
        console.error(err);
      });
  }

  static deleteById(id) {
    const db = getDb();
    return db.collection('product').deleteOne({
      _id: new mongodb.ObjectId(id)
    }).then(product => {
      return product;
    }).catch(err => {
      console.error(err);
    });
  }
};
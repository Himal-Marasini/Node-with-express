const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this._id = new mongodb.ObjectId(id);
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    const db = getDb();
    let dbop;
    if (this._id) {
      dbop = db.collection('product').updateOne({
        _id: id
      }, {
        $set: this
      });
    } else {
      dbop = db.collection('product').insertOne(this);
    }
    return dbop.then(result => {
      console.log(result.ops[0]);
    }).catch(err => {
      console.error(err);
    });
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('product').find()
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch(err => {
        console.error(err);
      });
  }

  static findById(id) {
    const db = getDb();
    return db.collection('product').find({
        _id: new mongodb.ObjectId(id)
      })
      .then(product => {
        console.log(product);
        return product;
      }).catch(err => {
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
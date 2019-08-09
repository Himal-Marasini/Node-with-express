const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
    });
};
exports.postAddProducts = (req, res) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res) => {
    Product.fetchAll().then(products => {
        res.render('shop', {
            prods: products,
            pageTitle: 'Shop',
            title: 'The Greate Book',
            path: '/',
            hasProducts: products.length > 0
        });
    }).catch(err => {
        console.error(err);
    });
};
exports.get404Error = (req, res) => {
    res.render('404.ejs', {
        title: 'Page Not Found'
    });
};
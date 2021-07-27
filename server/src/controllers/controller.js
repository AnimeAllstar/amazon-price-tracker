module.exports.renderHome = (req, res) => {
    res.render('index.html', {
        title: "Amazon price tracker",
        description: 'Price tracker for Amazon products'
    });
}
const getHomepage = (req, res) => {
    res.render('index', { title: 'Home' });
}

module.exports = {
    getHomepage,
}
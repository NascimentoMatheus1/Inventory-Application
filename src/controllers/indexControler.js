const getHomepage = (req, res) => {
    res.render('index', { title: 'Home' });
};

const getNotFoundpage = (req, res) => {
    res.status(404).render('error', {
        title: 'Error 404',
        errorCode: '404',
        errorMessage: 'Page Not Found ',
        errorDetails:
            "The page you're looking for was moved, deleted, or never existed in our server.",
    });
};

module.exports = {
    getHomepage,
    getNotFoundpage,
};

function serverError(res) {
    res.status(500).render('error', {
        title: 'Error 500',
        errorCode: '500',
        errorMessage: ' Internal Server Error !',
        errorDetails:
            'The server encountered an internal error or misconfiguration and was unable to complete your request.',
    });
    return;
}

function notFoundPage(res) {
    return res.status(404).render('error', {
        title: 'Error 404',
        errorCode: '404',
        errorMessage: 'Page Not Found ',
        errorDetails:
            "The page you're looking for was moved, deleted, or never existed in our server.",
    });
}

function badRequestPage(res) {
    return res.status(400).render('error', {
        title: 'Error 400',
        errorCode: '400',
        errorMessage: ' Bad Request ',
        errorDetails:
            'the server cannot or will not process the request because something about it is a client error.',
    });
}

module.exports = {
    serverError,
    notFoundPage,
    badRequestPage,
};

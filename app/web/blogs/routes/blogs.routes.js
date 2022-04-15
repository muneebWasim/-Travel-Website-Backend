const blogsController = require('../controller/blogs.controller'),
 	blogsHelpers = require('../controller//helpers/blogs.helper'),
	blogssMiddleware = require('../middlewares/blogs.middleware'),
	passport = require('passport');

module.exports = (app, ver) => {
    app.get(
        ver + '/blog/:blogId',
        blogsController.fetchBlog
    );

    app.get(
        ver + '/blogs/home/screen',
        blogsController.fetchBlogsHomeScreen
    );  

};
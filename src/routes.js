const router				    =	require('express').Router();
const health				    =	require('./controllers/health');
const userController	        =	require('./controllers/user');
const blogController	        =	require('./controllers/blog');
const commentController	        =	require('./controllers/comment');

const userValidator		        =	require('./middlewares/userValidator');
const blogValidator		        =	require('./middlewares/blogValidator');
const commentValidator		    =	require('./middlewares/commentValidator');
const { checkInvalid }		    =	require('./middlewares/validationReject');


// System Routes
router.get('/', health.loopback);
router.get('/health', health.check);

// User Routes
router.post('/login', userValidator.loginValidator, checkInvalid, userController.loginUser);
router.post('/signup', userValidator.userValidator, checkInvalid, userController.createUser);
router.get('/api/users', userController.getUsers);
router.get('/api/users/:id', userController.getUserById);
router.put('/api/users/:id', userValidator.userUpdateValidator, checkInvalid, userController.updateUserById);
router.put('/api/users/:id/spam', userController.bannedUserById);

// Blog Routes
router.post('/api/blogs', blogValidator.blogValidator, checkInvalid, blogController.createBlog);
router.get('/api/blogs', blogController.getBlogs);
router.get('/api/blogs/:id', blogController.getBlogById);
router.put('/api/blogs/:id', blogValidator.blogValidator, checkInvalid  , blogController.updateBlogById);
router.delete('/api/blogs/:id', blogController.deleteBlogById);

// Comment Routes
router.post('/api/comments', commentValidator.commentValidator, checkInvalid, commentController.createComment);
router.get('/api/comments', commentController.getComments);
router.get('/api/comments/:id', commentController.getCommentById);
router.put('/api/comments/:id', commentValidator.commentValidator, checkInvalid, commentController.updateCommentById);
router.put('/api/comments/:id/reply', commentValidator.commentValidator, checkInvalid, commentController.replyCommentById);
router.put('/api/comments/:id/vote', commentValidator.commentValidator, checkInvalid, commentController.voteCommentById);
router.delete('/api/comments/:id', commentController.deleteCommentById);
router.delete('/api/comments/:commenter/delete', commentController.deleteComments);

module.exports = router;
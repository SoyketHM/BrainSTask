const blogCrud   		    = require('../services/blogCrud');
const _p       				= require('../helpers/simpleasync');
const { createResponse }    = require('../utils/responseGenerate');


module.exports.createBlog = async (req, res,next) => {
	req.body.blogger = req.user.id;
	const [error,blog] = await _p(blogCrud.createBlog(req.body));

	if (error) {
		console.log(error);
		return next(new Error('blog creation failed' ));
	}
	return res.status(200).json(createResponse(blog, 'blog created successfully'));
};

module.exports.getBlogs = async (req, res,next) => {
	const [error,categories] = await _p(blogCrud.getBlogs(req.query));

	if(error) {
		console.log(error);
		return next(new Error('blog fetch error'));
	}
	return res.status(200).json(createResponse(categories));
};

module.exports.getBlogById = async (req, res,next) => {
	const [error,blog] = await _p(blogCrud.getBlogById(req.params.id));

	if(error) {
		console.log(error);
		return next(new Error('blog fetch error'));
	}

	if(!blog) {
		return res.status(200).json(createResponse(null, 'blog not found'));
	}
	return res.status(200).json(createResponse(blog));
};

module.exports.updateBlogById = async (req, res,next) => {
	if (req.body.blogger) delete req.body.blogger;
	let [error,blog] = await _p(blogCrud.updateBlogById(req.params.id, req.body));

	if(error) {
		console.log(error);
		return next(new Error('blog access error'));
	}
	if(!blog) {
		return res.status(200).json(createResponse(null, 'blog not found'));
	}
	return res.status(200).json(createResponse(blog, 'blog updated successfully'));
};

module.exports.deleteBlogById = async (req, res,next) => {
	let [error,blog] = await _p(blogCrud.deleteBlogById(req.params.id));

	if(error) {
		console.log(error);
		return next(new Error('blog access error'));
	}
	if(!blog) {
		return res.status(200).json(createResponse(null, 'blog not found'));
	}
	return res.status(200).json(createResponse(null, 'blog deleted successfully'));
};

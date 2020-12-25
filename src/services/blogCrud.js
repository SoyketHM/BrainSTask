const Blog 	= require('../models/Blog');
const _p    = require('../helpers/simpleasync');

//create blog
module.exports.createBlog = async blogInfo => {
	return new Promise(async (resolve, reject) => {
		const [error, saveBlogInfo] = await _p(Blog.create(blogInfo));

		if (!error) {
			return resolve(saveBlogInfo);
		} else {
			return reject(error.message);
		}
	});
};

//get all blogs || can use query string
module.exports.getBlogs = async query => {
	return new Promise(async (resolve, reject) => {
		const pageNum = query.page ? query.page : 1;
		const Limit = 10;
		const skip = Limit * (pageNum - 1);

		if(query.page) delete query.page;

		const [error, blogs] = await _p(Blog.find( query )
			.limit(Limit)
			.skip(skip)
			.sort({createdAt: 'desc'}));

		if(!error) {
			return resolve(blogs);
		} else {
			return reject(error.message);
		}
	});
};

//get blog by blog id
module.exports.getBlogById = async id => {
	return new Promise(async (resolve, reject) => {
		const [error, blog] = await _p(Blog.findOne({ _id: id }));

		if(!error) {
			return resolve(blog);
		} else {
			return reject(error.message);
		}
	});
};

//update blog by blog id
module.exports.updateBlogById = async (id, blogInfo) => {
	return new Promise(async (resolve, reject) => {
		const [error, updateBlogInfo] = await _p(Blog.findOneAndUpdate({ _id: id }, blogInfo, { new: true	}));

		if (!error) {
			return resolve(updateBlogInfo);
		} else {
			return reject(error.message);
		}
	});
};

//delete blog by blog id
module.exports.deleteBlogById = async (id, blogInfo) => {
	return new Promise(async (resolve, reject) => {
		const [error, deleteBlogInfo] = await _p(Blog.findOneAndDelete({ _id: id }));

		if (!error) {
			return resolve(deleteBlogInfo);
		} else {
			return reject(error.message);
		}
	});
};

const commentCrud          = require('../services/commentCrud');
const _p       				= require('../helpers/simpleasync');
const { createResponse }    = require('../utils/responseGenerate');


module.exports.createComment = async (req, res, next) => {
	req.body.commenter = req.user.id;
	const [error,comment] = await _p(commentCrud.createComment(req.body));

	if (error) {
		console.log(error);
		return next(new Error('comment creation failed' ));
	}
	if(comment.message) {
		return res.status(200).json(createResponse(null, comment.message));
	}
	return res.status(200).json(createResponse(comment, 'comment created successfully'));
};

module.exports.getComments = async (req, res,next) => {
	const [error,categories] = await _p(commentCrud.getComments(req.query));

	if(error) {
		console.log(error);
		return next(new Error('comment fetch error'));
	}
	return res.status(200).json(createResponse(categories));
};


module.exports.getCommentById = async (req, res,next) => {
	const [error,comment] = await _p(commentCrud.getCommentById(req.params.id));

	if(error) {
		console.log(error);
		return next(new Error('comment fetch error'));
	}

	if(!comment) {
		return res.status(200).json(createResponse(null, 'comment not found'));
	}
	return res.status(200).json(createResponse(comment));
};

module.exports.updateCommentById = async (req, res,next) => {
	if (req.body.commenter) delete req.body.commenter;
	let [error,comment] = await _p(commentCrud.updateCommentById(req.params.id, req.body));

	if(error) {
		console.log(error);
		return next(new Error('comment access error'));
	}
	if(!comment) {
		return res.status(200).json(createResponse(null, 'comment not found'));
	}
	return res.status(200).json(createResponse(comment, 'comment updated successfully'));
};

module.exports.replyCommentById = async (req, res,next) => {
	if (req.body.commenter) delete req.body.commenter;
	req.body.commenter = req.user.id;
	let [error,comment] = await _p(commentCrud.replyCommentById(req.params.id, req.body));

	if(error) {
		console.log(error);
		return next(new Error('comment access error'));
	}
	if(!comment) {
		return res.status(200).json(createResponse(null, 'comment not found'));
	}
	return res.status(200).json(createResponse(comment, 'comment reply successfully'));
};

module.exports.voteCommentById = async (req, res,next) => {
	if (req.body.commenter) delete req.body.commenter;
	req.body.voter = req.user.id;
	let [error,comment] = await _p(commentCrud.voteCommentById(req.params.id, req.body));

	if(error) {
		console.log(error);
		return next(new Error('comment access error'));
	}
	if(!comment) {
		return res.status(200).json(createResponse(null, 'comment not found'));
	}
	return res.status(200).json(createResponse(comment, 'comment voted successfully'));
};

module.exports.deleteCommentById = async (req, res,next) => {
	let [error,comment] = await _p(commentCrud.deleteCommentById(req.params.id));

	if(error) {
		console.log(error);
		return next(new Error('comment access error'));
	}
	if(!comment) {
		return res.status(200).json(createResponse(null, 'comment not found'));
	}
	return res.status(200).json(createResponse(null, 'comment deleted successfully'));
};

module.exports.deleteComments = async (req, res,next) => {
	let [error,comment] = await _p(commentCrud.deleteComments(req.params.commenter));

	if(error) {
		console.log(error);
		return next(new Error('comment access error'));
	}
	if(!comment) {
		return res.status(200).json(createResponse(null, 'comment not found'));
	}
	return res.status(200).json(createResponse(null, 'comments deleted successfully'));
};

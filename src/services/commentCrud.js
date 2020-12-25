const Blog = require('../models/Blog');
const Comment = require('../models/Comment');
const _p = require('../helpers/simpleasync');

//create comment
module.exports.createComment = async CommentInfo => {
	return new Promise(async (resolve, reject) => {
		const [err, blog] = await _p(Blog.findById({_id: CommentInfo.blog, comment: {$eq: false}}));
		if (blog) {
			return resolve({message: "comment option blocked"});
		} else {
			const [error, saveCommentInfo] = await _p(Comment.create(CommentInfo));
	
			if (!error) {
				return resolve(saveCommentInfo);
			} else {
				return reject(error.message);
			}
		}
	});
};

//get all comments || can use query string
module.exports.getComments = async query => {
	return new Promise(async (resolve, reject) => {
		const pageNum = query.page ? query.page : 1;
		const Limit = 10;
		const skip = Limit * (pageNum - 1);

		if (query.page) delete query.page;

		const [error, comments] = await _p(Comment.find(query)
			.limit(Limit)
			.skip(skip)
			.sort({ createdAt: 'desc' }));

		if (!error) {
			return resolve(comments);
		} else {
			return reject(error.message);
		}
	});
};

//get comment by comment id
module.exports.getCommentById = async id => {
	return new Promise(async (resolve, reject) => {
		const [error, comment] = await _p(Comment.findOne({ _id: id }));

		if (!error) {
			return resolve(comment);
		} else {
			return reject(error.message);
		}
	});
};

//update comment by comment id
module.exports.updateCommentById = async (id, updateInfo) => {
	return new Promise(async (resolve, reject) => {
		const [error, updateCommentInfo] = await _p(Comment.findOneAndUpdate({ _id: id }, updateInfo, { new: true }));

		if (!error) {
			return resolve(updateCommentInfo);
		} else {
			return reject(error.message);
		}
	});
};

//reply comment by comment id
module.exports.replyCommentById = async (id, replyInfo) => {
	return new Promise(async (resolve, reject) => {
		const query = { _id: id, reply: { $ne: false } };
		const update_comment_info = {
			$push: {
				replies: {
					commenter: replyInfo.commenter,
					text: replyInfo.text
				}
			}
		}
		const [error, updateComment] = await _p(Comment.findOneAndUpdate(query, update_comment_info, { new: true }));

		if (!error) {
			return resolve(updateComment);
		} else {
			return reject(error.message);
		}
	});
};

//vote comment by comment id
module.exports.voteCommentById = async (id, voteInfo) => {
	return new Promise(async (resolve, reject) => {
		const query = { _id: id, reply: { $ne: false } };
		const update_comment_info = {
			$push: {
				votes: {
					voter: voteInfo.voter,
					type: voteInfo.type
				}
			}
		}
		const [error, updateComment] = await _p(Comment.findOneAndUpdate(query, update_comment_info, { new: true }));

		if (!error) {
			return resolve(updateComment);
		} else {
			return reject(error.message);
		}
	});
};

//delete comment by comment id
module.exports.deleteCommentById = async (id,) => {
	return new Promise(async (resolve, reject) => {
		const [error, deleteInfo] = await _p(Comment.findOneAndDelete({ _id: id }));

		if (!error) {
			return resolve(deleteInfo);
		} else {
			return reject(error.message);
		}
	});
};

//delete all comment by commenter id
module.exports.deleteComments = async (id) => {
	return new Promise(async (resolve, reject) => {
		const [error, deleteInfo] = await _p(Comment.deleteMany({ commenter: id }));

		if (!error) {
			return resolve(deleteInfo);
		} else {
			return reject(error.message);
		}
	});
};

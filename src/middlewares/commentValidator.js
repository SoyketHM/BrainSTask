const { check }    = require('express-validator');

module.exports.commentValidator = [
    check('blog')
		.optional().exists({ checkNull: true, checkFalsy: true }).bail().isString().withMessage('Blog must be a string'),
    check('text')
		.optional().exists({ checkNull: true, checkFalsy: true }).bail().isString().withMessage('Text must be a string'),
    check('reply')
		.optional().isBoolean().withMessage('reply must be a string'),
	check('replies')
		.optional().isArray().withMessage('Replies must be an array'),
	check('replies.commenter')
		.optional().exists({ checkNull: true, checkFalsy: true }).bail().isString().withMessage('Replier must be a string'),
	check('replies.text')
		.optional().exists({ checkNull: true, checkFalsy: true }).bail().isString().withMessage('Reply text must be a string'),
	check('votes')
		.optional().isArray().withMessage('Votes must be an array'),
	check('votes.commenter')
		.optional().exists({ checkNull: true, checkFalsy: true }).bail().isString().withMessage('Voter must be a string'),
	check('votes.type')
		.optional().exists({ checkNull: true, checkFalsy: true }).bail().isString().withMessage('Vote type must be a string'),
];
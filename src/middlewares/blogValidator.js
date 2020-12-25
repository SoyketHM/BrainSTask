const { check }    = require('express-validator');

module.exports.blogValidator = [
    check('title')
		.optional().exists({ checkNull: true, checkFalsy: true }).bail().isString().withMessage('Title must be a string'),
    check('body')
		.optional().exists({ checkNull: true, checkFalsy: true }).bail().isString().withMessage('Body must be a string'),
	check('comment')
		.optional().isBoolean().withMessage('Comment must be a boolean'),
	check('status')
		.optional().exists({ checkNull: true, checkFalsy: true }).bail().isString().withMessage('Status must be a string'),
];
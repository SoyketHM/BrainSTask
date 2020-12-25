const mongoose = require('mongoose');
const { Schema } = mongoose;
const objectID = Schema.ObjectId;
mongoose.Promise = global.Promise;

const commentSchema = new Schema({
	commenter: {
		type: objectID,
		ref: 'User',
		required: true
	},
	blog: {
		type: objectID,
		ref: 'Blog',
		required: true
	},
	text: {
		type: String,
	},
	reply: {
		type: Boolean,
		default: true
	},
	replies: [{
		commenter: {
			type: objectID,
			ref: 'User',
			required: true
		},
		text: {
			type: String,
		},
		date: {
			type: Date,
			default: new Date
		},
	}],
	votes: [{
		voter: {
			type: objectID,
			ref: 'User',
			required: true
		},
		type: { // up, down
			type: String,
		}
	}]

}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);



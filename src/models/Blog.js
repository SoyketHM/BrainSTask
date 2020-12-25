const mongoose 		= require('mongoose');
const { Schema } 	= mongoose;
const objectID      = Schema.ObjectId;
mongoose.Promise 	= global.Promise;

const blogSchema = new Schema({
	blogger: {
		type: objectID,
		ref: 'User',
		required: true
	},
	title: {
		type: String,
		trim: true,
	},
	body: {
		type: String,
		trim: true,
	},
	comment: {
		type: Boolean,
		default: true
	},
	status: { // active, draft
		type: String,
		lowercase: true,
		default: 'active'
	}
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);



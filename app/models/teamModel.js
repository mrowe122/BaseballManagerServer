//grab the packages that we need for the user model
var mongoose	= require('mongoose');
var Schema		= mongoose.Schema;

//player schema
var TeamSchema = new Schema({
	_id:		{type: String, required: true},
	name:		{type: String, required: true},
	coach:		{type: String, required: true},
	phone:		{type: String},
	email:		{type: String},
	wins:		{type: Number},
	lose:		{type: Number}
});

//return the model
module.exports = mongoose.model('Team', TeamSchema);
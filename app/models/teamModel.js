//grab the packages that we need for the user model
var mongoose	= require('mongoose');
var Schema		= mongoose.Schema;

//team schema
var TeamSchema = new Schema({
	teamId:			{type: String, required: true},
	coach_email:	{type: String, required: true, select: false},
	coach_name:		{type: String, required: true},
	team_name:		{type: String, required: true},
	coach_phone:	{type: String, default: 'n/a'}
});

//return the model
module.exports = mongoose.model('Team', TeamSchema);
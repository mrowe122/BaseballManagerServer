//grab the packages that we need for the user model
var mongoose	= require('mongoose');
var Schema		= mongoose.Schema;

//player schema
var TeamSchema = new Schema({
	teamId:				{type: String, required: true},
	coach_name:			{type: String, required: true},
	team_name:			{type: String, required: true},
	coach_email:		{type: String, required: true},
	coach_phone:		{type: String, default: 'n/a'},
	players: [{
		playerNum:				{type: String, required: true},
		name:					{type: String, required: true},
		number:					{type: Number, required: true},
		team_name:				{type: String, required: true},
		bats:					{type: String, required: true},
		throws_:				{type: String, required: true},
		position:				{type: String, required: true},
		batting_avg:			{type: Number, default: '0'},
		rbi:					{type: Number, default: '0'},
		runs:					{type: Number, default: '0'},
		hits:					{type: Number, default: '0'},
		strike_outs:			{type: Number, default: '0'},
		walks:					{type: Number, default: '0'},
		single:					{type: Number, default: '0'},
		double_:				{type: Number, default: '0'},
		triple:					{type: Number, default: '0'},
		home_runs:				{type: Number, default: '0'},
		fly_balls:				{type: Number, default: '0'},
		ground_balls:			{type: Number, default: '0'},
		on_base_percentage:		{type: Number, default: '0'},
		bases_stolen:			{type: Number, default: '0'},
		caught_stealing:		{type: Number, default: '0'},
		errors_:				{type: Number, default: '0'},
		field_percentage:		{type: Number, default: '0'},
		put_outs:				{type: Number, default: '0'}
	}]
});

//return the model
module.exports = mongoose.model('Team', TeamSchema);
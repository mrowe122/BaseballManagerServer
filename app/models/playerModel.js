//grab the packages that we need for the user model
var mongoose	= require('mongoose');
var Schema		= mongoose.Schema;

//player schema
var PlayerSchema = new Schema({
	_id:					{type: String, required: true},
	name:					{type: String, required: true},
	number:					{type: Number, required: true},
	team_name:				{type: String, required: true},
	bats:					{type: String, required: true},
	throws_:				{type: String, required: true},
	position:				{type: String, required: true},
	batting_avg:			{type: Number},
	rbi:					{type: Number},
	runs:					{type: Number},
	hits:					{type: Number},
	strike_outs:			{type: Number},
	walks:					{type: Number},
	single:					{type: Number},
	double_:				{type: Number},
	triple:					{type: Number},
	home_runs:				{type: Number},
	fly_balls:				{type: Number},
	ground_balls:			{type: Number},
	on_base_percentage:		{type: Number},
	bases_stolen:			{type: Number},
	caught_stealing:		{type: Number},
	errors_:				{type: Number},
	field_percentage:		{type: Number},
	put_outs:				{type: Number}
});

//return the model
module.exports = mongoose.model('Player', PlayerSchema);
//grab the packages that we need for the user model
var mongoose	= require('mongoose');
var Schema		= mongoose.Schema;

//player schema
var PlayerSchema = new Schema({
	teamId:					{type: String},
	playerId:				{type: String, index: {unique: true}},
	name:					{type: String},
	number:					{type: Number},
	team_name:				{type: String},
	bats:					{type: String},
	throws_:				{type: String},
	position:				{type: String},
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
})

//return the model
module.exports = mongoose.model('Player', PlayerSchema);
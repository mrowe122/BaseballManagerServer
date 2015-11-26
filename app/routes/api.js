var mongoose	= require('mongoose');
var Player		= require('../models/playerModel');
var Team		= require('../models/teamModel');
var shortid		= require('shortid');

module.exports = function(app, express) {
	var apiRouter = express.Router();

	apiRouter.route('/newplayer')
		.post(function (req, res) {

			//instantiate needed variables
			var obj = req.body;
			//total number of players added will be the first parameter
			var count = obj[0].count + 1;
			var info = [];

			for(i = 1; i < count; i++) {
				var player = new Player();
				player._id					= shortid.generate();
				player.name					= obj[i].name;
				player.number				= obj[i].number;
				player.team_name			= obj[i].team;
				player.bats					= obj[i].bats;
				player.throws_				= obj[i].throws_;
				player.position				= obj[i].position;
				player.batting_avg			= 0;
				player.rbi					= 0;
				player.runs					= 0;
				player.hits					= 0;
				player.strike_outs			= 0;
				player.walks				= 0;
				player.single				= 0;
				player.double_				= 0;
				player.triple				= 0;
				player.home_runs			= 0;
				player.fly_balls			= 0;
				player.on_base_percentage	= 0;
				player.bases_stolen			= 0;
				player.caught_stealing		= 0;
				player.errors_				= 0;
				player.field_percentage		= 0;
				player.put_outs				= 0;

				info.push(player);
			}

			Player.create(info, function (err, docs) {
				if(err) {
					return res.json({
						message:'Something went wrong'
					})
				} else {
					return res.json({
						message:'Players created'
					})
				}
			});
		});

	apiRouter.route('/newteam')
		.post(function (req, res) {
			var team = new Team();
			team.name	= req.body.name;
			team.coach	= req.body.coach;
			team.phone	= req.body.phone;
			team.email	= req.body.email;
			team.wins	= 0;
			team.lose	= 0;

			team.save(function (err) {
				if(err) {
					return res.json({
						message:'Something went wrong'
					});
				} else {
					return res.json({
						message:'Team created'
					});
				}
			});
		});

	return apiRouter;
}
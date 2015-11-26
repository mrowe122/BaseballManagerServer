var Player		= require('../models/playerModel');
var Team		= require('../models/teamModel');

module.exports = function(app, express) {
	var apiRouter = express.Router();

	apiRouter.route('/newplayer')
		.post(function (req, res) {
			var player = new Player();

			player.name					= req.body.name;
			player.number				= req.body.number;
			player.team_name			= req.body.teamName;
			player.bats					= req.body.bats;
			player.throws_				= req.body.throws_;
			player.position				= req.body.position;
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

			player.save(function (err) {
				if(err) {
					return res.json({
						message:'Something went wrong'
					})
				} else {
					return res.json({
						message:'Player created'
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

	apiRouter.route('/test')
		.post(function (req, res) {
			console.log(req.body);
		})

	return apiRouter;
}
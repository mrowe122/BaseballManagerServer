var mongoose	= require('mongoose');
var PlayerModel	= require('../models/playerModel');
var Team		= require('../models/teamModel');
var jwt			= require('jsonwebtoken');

module.exports = function(app, express) {
	var apiRouter = express.Router();
/*
//later use for setting up a token for authentication
	apiRouter.post('/authenticate', function (req, res) {
		User.findOne({
			username:req.body.username
		}).select('name email password').exec(function (err, user) {
			if(err)
				throw err;
			if(!user)
				return res.send('Sorry, authentication failed.');
			else if (user) {
				var validPassword = user.comparePassword(req.body.password);

				if(!validPassword)
					return res.send('Sorry, password did not match');
				else {
					var token = jwt.sign({
						name: user.name,
						email: user.email
					}, config.secret, {
						expiresInMinutes: 1440
					});
					res.json({
						success: true,
						message: 'heres your token',
						token: token
					});
				}
			}
		});
	});
*/
	apiRouter.route('/players')
		.post(function (req, res) {

			//instantiate needed variables
			var jArray = req.body;
			var info = [];

			for(i = 0; i < jArray.length; i++) {
				var player = new PlayerModel();
				//player._id					= jArray[i]._id
				player.name					= jArray[i].name;
				player.number				= jArray[i].number;
				player.team_name			= jArray[i].team;
				player.bats					= jArray[i].bats;
				player.throws_				= jArray[i].throws_;
				player.position				= jArray[i].position;
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
				player.ground_balls			= 0;
				player.on_base_percentage	= 0;
				player.bases_stolen			= 0;
				player.caught_stealing		= 0;
				player.errors_				= 0;
				player.field_percentage		= 0;
				player.put_outs				= 0;

				info.push(player);
			}

			PlayerModel.create(info, function (err, docs) {
				if(err)
					return res.send(err);
				else
					return res.send('Players created');
			});
		})

		.get(function (req, res) {
			PlayerModel.find({}, function (err, players) {
				if (err)
					return res.send(err);
				else if (!players.length)
					return res.send('null');
				else
					return res.json(players);
			});
		});

	apiRouter.route('/players/:player_id')
		.get(function (req, res) {
			PlayerModel.findById(req.params.player_id, function (err, player) {
				if (err)
					return res.send(err);
				else 
					return res.json(player);
			});
		})
		.put(function (req, res) {
			//find player with id
			PlayerModel.findById(req.params.player_id, function (err, player) {
				if (err)
					return res.send(err);

				//only update if data has changedb
				if(req.body.name)
					player.name = req.body.name;

				if(req.body.number)
					player.number = req.body.number;

				if(req.body.team_name)
					player.team_name = req.body.team_name;

				if(req.body.bats)
					player.bats = req.body.bats;

				if(req.body.throws_)
					player.throws_ = req.body.throws_;

				if(req.body.position)
					player.position = req.body.position;

				player.save(function (err) {
					if (err)
						return res.send(err);
					else
						return res.json('Player updated');
				});
			});
		});

	apiRouter.route('/teams')
		.post(function (req, res) {
			var team = new Team();
			team.name	= req.body.name;
			team.coach	= req.body.coach;
			team.phone	= req.body.phone;
			team.email	= req.body.email;
			team.wins	= 0;
			team.lose	= 0;

			team.save(function (err) {
				if(err)
					return res.send(err);
				else
					return res.send('Team created');
			});
		});

	apiRouter.route('/test')
		.post(function (req, res) {
			var team = req.body;
			console.log(team.length);
			return res.send('Team created');
		});

	return apiRouter;
}
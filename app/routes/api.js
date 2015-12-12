var mongoose	= require('mongoose');
var TeamModel	= require('../models/teamModel');
var jwt			= require('jsonwebtoken');
var shortid		= require('shortid');

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
			console.log(req.body.players);
			TeamModel.findOneAndUpdate(
				{coach_email: req.body.email},
				{$push: {players: req.body.players}},
				{safe: true, upsert: true},
				function (err, docs) {
				if(err)
					return res.send(err);
				else
					return res.send('Players stored');
				}
			);
		})

		.get(function (req, res) {
			TeamModel.find({}, function (err, players) {
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
			TeamModel.findById(req.params.player_id, function (err, player) {
				if (err)
					return res.send(err);
				else 
					return res.json(player);
			});
		})
		.put(function (req, res) {
			//find player with id
			TeamModel.findById(req.params.player_id, function (err, player) {
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

	apiRouter.route('/team')
		.post(function (req, res) {
			TeamModel.create(req.body, function (err) {
				if(err)
					return res.send(err);
				else
					return res.send('Team created');
			});
		});

	return apiRouter;
}
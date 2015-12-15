var mongoose	= require('mongoose');
var TeamModel	= require('../models/teamModel');
var PlayerModel	= require('../models/playerModel');
var jwt			= require('jsonwebtoken');
var shortid		= require('shortid');
var encryption	= require('../../config/decrypt.js');

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
			req.body.players.forEach(function (player) {
				PlayerModel.update(
					{playerId: player.playerId}, player, {upsert:true}, function (err) {
						if(err)
							res.send(err);
					});
			});
			return res.send('Players synced');
		})

	apiRouter.route('/team')
		.post(function (req, res) {
			var team = new TeamModel(req.body);
			var check = encryption.decrypt(team.teamId);
			if (check) {
				team.coach_email = check;
				TeamModel.update(
					{coach_email: team.coach_email}, team, {upsert:true}, function (err, numberAffected, response) {
						if(err)
							console.log(err);
					});
				return res.send('Team synced');
			} else {
				return res.json({'Error' : 'invalid'});
			}
		});

	apiRouter.route('/team/*')
		.get(function (req, res) {
			var check = encryption.decrypt(req.params[0]);
			if (check) {
				TeamModel.findOne({coach_email: check}, function (err, team) {
					if(!team)
						return res.json({code: '99000'});

					PlayerModel.find({teamId : req.params[0]}, function (err, players) {
						return res.json({code: '77123',	Team: team, Player: players});
					})
				})
			} else {
				return res.json({error: 'invalid'});
			}
		});

	return apiRouter;
}
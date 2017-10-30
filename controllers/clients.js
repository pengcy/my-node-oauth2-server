const crypto = require('crypto');
const OAuthClient = require('./../models/OAuthClient.js');

module.exports.createClient = (req, res) => {
  console.log("Creating a new client, redirectUri: " + req.body.redirectUri);
  const client = new OAuthClient(req.body);
  client.clientId = crypto.createHash('md5').update(crypto.randomBytes(16)).digest('hex'); // 32 chars
  client.clientSecret = crypto.createHash('sha256').update(crypto.randomBytes(32)).digest('hex'); // 64 chars
  client.redirectUris = [req.body.redirectUri];
  client.user = req.session.userId;
  client.scope = 'profile';

  client.save()
    .then(() => res.json({ id: client }));
};

module.exports.getClient = (req, res) => {
  OAuthClient.findOne({ name: req.query.name })
    .then((client) => {
      res.json(client);
    });
};

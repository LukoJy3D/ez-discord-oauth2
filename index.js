const express = require('express');
const { clientId, clientSecret, redirectUri, port, scope } = require('./config.json');
const DiscordOAuth2 = require('discord-oauth2');

const app = express();
const oauth = new DiscordOAuth2();

app.get('/login', (req, res) => {
  const authUrl = oauth.generateAuthUrl({
    clientId: clientId,
    redirectURI: redirectUri,
    scope: scope,
  });
  res.redirect(authUrl);
});

app.get('/', async (req, res) => {
  const code = req.query.code;
  try {
    const token = await oauth.tokenRequest({
      clientId,
      clientSecret,
      code,
      scope: scope,
      grantType: 'authorization_code',
      redirectUri,
    });

    console.log('Token:', token); // <-- For debugging purposes only. Don't leave for safety reasons.

    //Here, you can handle the token by using it to make requests to the Discord API. For specific example check out the README.

    res.send('Authorized successfully!');

  } catch (error) {
    console.error('Error:', error.message);
    res.send('Error occurred during login.');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

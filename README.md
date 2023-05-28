# ez-discord-oauth2
A lightweight Node.js application that allows you to test OAuth2 authentication with Discord. Some of discord api endpoints require user authorization to be accessed. This application allows you to test those endpoints without having to create a full-fledged application.

## Prerequisites
1. [Node.js](https://nodejs.org/en/)
2. [express](https://www.npmjs.com/package/express) `npm install express`
3. [discord-oauth2](https://www.npmjs.com/package/discord-oauth2) `npm install discord-oauth2`

## Setup
1. Clone this repository
2. Create a new application on the [Discord Developer Portal](https://discord.com/developers/applications). If you already have one, replace all variables in `config.json`. `clientId`, `clientSecret` can be found under the `Oauth -> General`.
3. Create redirect url in the Discord Developer Portal and change it in `config.json`. `http://localhost:3000` is the default redirect URL.
4. Define scopes in `config.json`. `identify` and `connections` are the default scope.
5. Run `node index.js` in the root directory of the project.
6. Access http://localhost:3000/login and Authorize your application and you should be redirected to your redirect url with a `code` query parameter. `code` parameter is further processed in `index.js` and you should see it printed in console.

## Usage
**getUserConnections()** is an example of how to use the `discord-oauth2` package to access user's connections.

```js
oauth.getUserConnections(token.access_token).then(console.log);
```

will provide following results:

```bash
...
  {
    type: 'battlenet',
    id: 'superman#1234',
    name: 'superman#1234',
    visibility: 1,
    friend_sync: true,
    show_activity: true,
    verified: true,
    two_way_link: false,
    metadata_visibility: 1
  },
  {
    type: 'spotify',
    id: 'superman#1234',
    name: 'Clark Kent',
    visibility: 1,
    friend_sync: false,
    show_activity: true,
    verified: true,
    two_way_link: false,
    metadata_visibility: 0
  }
...
``` 

**getUser()** is an example of how to use the `discord-oauth2` package to access user's information.

```js
oauth.getUser(token.access_token).then(console.log);
```

will provide following results:

```bash
{
  id: '123456789012345678',
  username: 'superman',
  global_name: null,
  avatar: 'a_123456789012345678',
  discriminator: '1234',
  public_flags: 64,
  flags: 64,
  banner: 'a_123456789012345678',
  banner_color: null,
  accent_color: null,
  locale: 'en-US',
  mfa_enabled: false,
  premium_type: 2,
  avatar_decoration: null
}
```
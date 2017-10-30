# Note
This is an example of OAuth2 server using the Node.js library [node-oauth2-server](https://github.com/oauthjs/node-oauth2-server). 

## 1. Install mongodb
```
brew update
brew install mongodb
mkdir -p /data/db
sudo chown -R `id -un` /data/db
sudo mongod
```

## 2. Run the OAuth2 server
```
npm install
npm start
```

## 3. Register a new user.
http://localhost:3000/register

Email: aa@aa.com<br>
Password: aaaaaa

## 4. Login with the new user.
http://localhost:3000/login


## 5. Create a new client. This is similar to creating a new client/app on the developer's web console on Facebook, LinkedIn, Google, Twitter, etc.
http://localhost:3000/add-client

Redirect URI: http://localhost:3000/

After the Register button is clicked, the browser will show the result from the server. Take note of the _id, clientId and clientSecret, and update them for the following steps.
```
{
  id: {
    __v: 0,
    scope: "profile",
    user: "59f6b1442ebfd6cdc3923e75",
    clientSecret: "bdfedba66893f47332b68d895174de41e47aec75d15c3568705a509e90491c39",
    clientId: "8bc2f1f89853e538ebaf0008c2ef4aa2",
    _id: "59f6b19f2ebfd6cdc3923e76",
    grants: [
      "authorization_code",
      "password",
      "refresh_token",
      "client_credentials"
    ],
    redirectUris: [
      "http://localhost:3000/"
    ]
  }
}
```


## 6. Get access token by client id and client secret, with the grant type of client_credentials.
```
curl -X POST \
  http://localhost:3000/oauth/token \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'client_id=8bc2f1f89853e538ebaf0008c2ef4aa2&client_secret=bdfedba66893f47332b68d895174de41e47aec75d15c3568705a509e90491c39&grant_type=client_credentials'
```  



## 7. Get authorization code by providing an access token as a Bearer token in the header.
```
curl -X GET \
  'http://localhost:3000/oauth/authorize-by-token?response_type=code&client_id=8bc2f1f89853e538ebaf0008c2ef4aa2&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&state=randomString' \
  -H 'authorization: Bearer 5fdfde8c50123ed56a2660691f9f2e7bfc80fcaf' \
  -H 'cache-control: no-cache'
```


## 8. Get authorization code by asking the user to authorize. If Authorize is clicked, the auth code should show up as an url parameter value of code in the browser address bar.

http://localhost:3000/oauth/authorize?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&client_id=8bc2f1f89853e538ebaf0008c2ef4aa2


## 9. Make a post request using curl to get the access token. Replace the auth code with the one obtained from the previous step.
```
curl -X POST \
  http://localhost:3000/oauth/token \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'client_id=8bc2f1f89853e538ebaf0008c2ef4aa2&client_secret=bdfedba66893f47332b68d895174de41e47aec75d15c3568705a509e90491c39&code=7184ec8ec9e42fccbc231357673db8e6502c43c3&grant_type=authorization_code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F'
```


## 10. Use the access token to get user object. The access token is passed to the server as a Bearer token in the header.
```
curl -X GET \
  http://localhost:3000/users \
  -H 'authorization: Bearer 6f3d48919c9fb2df1f173f16bcf6b3d8398287c3' \
  -H 'cache-control: no-cache'
```


## References:
https://github.com/oauthjs/node-oauth2-server<br>
https://oauth2-server.readthedocs.io/en/latest<br>
https://github.com/slavab89/oauth2-server-example-mongodb<br>
https://github.com/mekentosj/oauth2-example<br>
http://scottksmith.com/blog/2014/07/02/beer-locker-building-a-restful-api-with-node-oauth2-server/




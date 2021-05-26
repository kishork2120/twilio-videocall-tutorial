const express = require('express');
const app = express();
const cors = require('cors');
const shortId = require('shortid');

app.use(cors());

var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;

// Substitute your Twilio AccountSid and ApiKey details
var ACCOUNT_SID = '<ACCOUNT_SID>';
var API_KEY_SID = '<API_KEY_SID>';
var API_KEY_SECRET = '<API_KEY_SECRET>';

// Create an Access Token
var accessToken = new AccessToken(
  ACCOUNT_SID,
  API_KEY_SID,
  API_KEY_SECRET
);

// get access token
app.get('/getToken',(req,res)=>{
  // Set the Identity of this token
  accessToken.identity = shortId.generate();

  // Grant access to Video
  var grant = new VideoGrant();
  accessToken.addGrant(grant);
  // Serialize the token as a JWT
  const jwt = accessToken.toJwt();
  res.json({
    accessToken: jwt
  })
})

// starting server
app.listen(3001,(err)=>{
  if(err) console.log(err)
  else console.log(`Server on port ${3001}`)
})
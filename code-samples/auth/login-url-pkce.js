const RC = require('@ringcentral/sdk').SDK
import {randomBytes} from 'crypto';
import {createHash} from 'crypto';

function _generateCodeVerifier() {
    let codeVerifier: any = randomBytes(32);
    codeVerifier = codeVerifier
	.toString('base64')
	.replace(/\+/g, '-')
	.replace(/\//g, '_')
	.replace(/=/g, '');
    return codeVerifier;
}

let codeVerifier = this._generateCodeVerifier();
let codeChallenge = createHash('sha256')
    .update(codeVerifier)
    .digest()
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET,
    'redirectUri':  process.env.RC_REDIRECT_URI
});
var platform = rcsdk.platform();

console.log( "Login URL: ", platform.loginUrl({
    "state": "1234567890",
    "code_challenge": codeChallenge,
    "code_challenge_method": "S256"
}) )

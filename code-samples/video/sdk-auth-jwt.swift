// Place your personal JWT or username and password
let options = RcvOauthOptions.create()
options?.setGrantType(RcvGrantType.jwt)
options?.setJwt(PersonalJwt)

RcvEngine.instance().authorize(options)

// Replace your token pair string here for testing
let TokenJsonStr = #"""
{
    "access_token": "{access token}",
    "token_type": "bearer",
    "expires_in": 3600,
    "refresh_token": "{refresh token}",
    "refresh_token_expires_in": 604800,
    "scope": "Meetings",
    "owner_id": "{owner id}",
    "endpoint_id": "{endpoint id}"
}
"""#
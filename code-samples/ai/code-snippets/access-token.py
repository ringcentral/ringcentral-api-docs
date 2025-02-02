from ringcentral import SDK

# Authenticate a user using a personal JWT token
def login():
  try:
      platform.login( jwt= "PRODUCTION-JWT" )
      tokens = platform.auth().data()
      contentUri = f'https://media.ringcentral.com/restapi/.../recording/1662272004/content?access_token={tokens["access_token"]}';
      # ...
  except Exception as e:
      print ("Unable to authenticate to platform. Check credentials. " + str(e))

from ringcentral import SDK

sdk = SDK( "client_id", "client_secret", "server_url" )
platform = sdk.platform()
platform.login( "username", "extension", "password" )

def get_account_call_queues():
    try:
        resp = platform.get('/restapi/v1.0/account/~/call-queues')
        jsonObj = resp.json()
        for record in jsonObj.records:
            if record.name == "Demo call queue":
                read_call_queue_member_status(record.id)
    except ApiException as e:
        print (e)

def read_call_queue_member_status(id):
    try:
        resp = platform.get('/restapi/v1.0/account/~/call-queues/' + id + "/presence")
        print (resp.text())
    except ApiException as e:
        print (e)

get_account_call_queues()

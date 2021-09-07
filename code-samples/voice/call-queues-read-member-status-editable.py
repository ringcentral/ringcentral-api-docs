from ringcentral import SDK

sdk = SDK( "client_id", "client_secret", "server_url" )
platform = sdk.platform()
platform.login( "username", "extension", "password" )

def get_account_call_queues():
    try:
        resp = platform.get('/restapi/v1.0/account/~/call-queues')
        for record in resp.json().records:
            if record.name == "Demo call queue":
                read_call_queue_info(record.id)
    except ApiException as e:
        print (e)

def read_call_queue_info(id):
    try:
        resp = platform.get('/restapi/v1.0/account/~/call-queues/' + id)
        print (resp.text())
    except ApiException as e:
            print (e)

get_account_call_queues()

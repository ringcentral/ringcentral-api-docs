from ringcentral import SDK

sdk = SDK( "client_id", "client_secret", "server_url" )
platform = sdk.platform()
platform.login( "username", "extension", "password" )

def get_account_call_queues():
    try:
        resp = platform.get('/restapi/v1.0/account/~/call-queues')
        for record in resp.json().records:
            get_call_queue_config(record.id)
    except ApiException as e:
        print (e)

def get_call_queue_config(id):
    try:
        resp = platform.get('/restapi/v1.0/account/~/call-queues/' + id)
        jsonObj = resp.json()
        if jsonObj.editableMemberStatus == False:
            enable_call_queue_editable(jsonObj.id)
    except ApiException as e:
            print (e)

def enable_call_queue_editable(id):
    try:
        resp = platform.put('/restapi/v1.0/account/~/call-queues/' + id,
        {
            "editableMemberStatus": True
        })
        print (resp.text())
    except ApiException as e:
        print (e)

get_account_call_queues()

from ringcentral import SDK

sdk = SDK( "client_id", "client_secret", "server_url" )
platform = sdk.platform()
platform.login( "username", "extension", "password" )

def get_account_call_queues():
    try:
        resp = platform.get('/restapi/v1.0/account/~/call-queues')
        for record in resp.json().records:
            if record.name == "Demo call queue":
              update_call_queue_member_status(record.id)
    except ApiException as e:
        print (e)


def update_call_queue_member_status(id):
    try:
        resp = platform.put('/restapi/v1.0/account/~/call-queues/' + id + '/presence',
        {
            "records": [
              {
                "member": { "id" : "111111111" },
                "acceptCurrentQueueCalls": False
              },
              {
                "member": { "id" : "222222222" },
                "acceptCurrentQueueCalls": True
              },
              {
                "member": { "id" : "333333333" },
                "acceptCurrentQueueCalls": False
              }
             ]
        })
        print (resp.text())
    except ApiException as e:
        print (e)

get_account_call_queues()

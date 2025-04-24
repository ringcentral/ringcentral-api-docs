platform.get('/rcvideo/v1/history/account/~/meetings')
.then(function (resp) {
    console.log( resp.json() )
});

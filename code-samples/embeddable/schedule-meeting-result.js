// listen response
window.addEventListener('message', function (e) {
    var data = e.data;
    if (data && data.type === 'rc-adapter-message-response') {
        if (data.responseId === requestId) {
            console.log(data.response);
        }
    }
});

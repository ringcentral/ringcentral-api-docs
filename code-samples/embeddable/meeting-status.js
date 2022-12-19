window.addEventListener('message', (e) => {
    const data = e.data;
    if (data) {
        switch (data.type) {
        case 'rc-meeting-status-notify':
            // get meeting status and permission from widget
            console.log('rc-meeting-status-notify:', data.ready, data.permission);
            break;
        default:
            break;
        }
    }
});

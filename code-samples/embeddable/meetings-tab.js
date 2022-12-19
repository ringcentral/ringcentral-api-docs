document.querySelector("#rc-widget-adapter-frame").contentWindow.postMessage({
    type: 'rc-adapter-navigate-to',
      path: '/meeting', // '/messages', '/dialer', '/history', '/settings'
}, '*');

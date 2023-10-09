export var Messenger;
(function (Messenger) {
    const routes = new Map();
    self.addEventListener('message', event => {
        const message = event.data;
        if (message.route) {
            const route = routes.get(message.route);
            if (!route)
                return;
            try {
                let content = route(message.content);
                postMessage({
                    id: message.id, content: content, status: true
                });
            }
            catch (err) {
                postMessage({
                    id: message.id, content: err, status: false
                });
            }
        }
    });
    function setRoute(routeName, method) {
        routes.set(routeName, method);
    }
    Messenger.setRoute = setRoute;
    function send(route, content, transferables) {
        postMessage({ route: route, content: content }, transferables);
    }
    Messenger.send = send;
})(Messenger || (Messenger = {}));

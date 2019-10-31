'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('thankyou', 'thankyou.html'),
            new Route('sorry', 'sorry.html'),

        ]);
    }
    init();
}());
'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('upload', 'upload.html'),
            new Route('help', 'help.html'),
            new Route('question', 'question.html', true),
            new Route('thankyou', 'thankyou.html'),
        ]);
    }
    init();
}());
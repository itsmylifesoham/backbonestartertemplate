'use strict';

require.config({
    baseUrl: 'lib',
    paths: {
        app: '../app',
        bootstrapjs: 'bootstrap.bundle',
    },
    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: "Backbone"
        },
        underscore: {
            exports: '_'
        }
    }
});

/* obtained from https://stackoverflow.com/questions/11581611/load-files-in-specific-order-with-requirejs */
var requireQueue = function (modules, callback) {
    function load(queue, results) {
        if (queue.length) {
            require([queue.shift()], function (result) {
                results.push(result);
                load(queue, results);
            });
        } else {
            callback.apply(null, results);
        }
    }

    load(modules, []);
};

define('AppView', function (require, exports, module) {
    require('bootstrapjs');
    var Bb = require('backbone');
    var $ = require('jquery');
    var router = require('app/router');

    var AppView = Bb.View.extend({
        constructor: function (parent) {
            if (!parent)
                throw new Error("Please provide a parent element for the app");

            Bb.View.call(this, {
                el: parent
            });
        },
        initialize: function(){
            this.router = router
        }
    });

   

    AppView.prototype.start = function () {
        Bb.history.start();
        // delegate to the homeView controller here to append to the appView
    };

    return AppView;
});

require(['AppView', 'app/globals'], function (AppView, globals) {   
    var appView = new AppView('#app'); 
    globals.appView = appView;
    appView.start();
});

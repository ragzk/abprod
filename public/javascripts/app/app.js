﻿var APP = angular.module('APP', ['matchmedia-ng', 'ngProgress', 'ngSanitize', 'ui.bootstrap', 'ngRoute']);
//APP.config(function ($locationProvider) {
//    $locationProvider.html5Mode({
//        enabled: true,
//        requireBase: false
//    });
//});

APP.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
]);

window.addEventListener("popstate", function (e) {
    window.location.href = location.href;
});


$(document).ready(function () {
    $('.slider3').bxSlider({
        slideWidth: 5000,
        minSlides: 2,
        maxSlides: 4,
        slideMargin: 10
    });
});
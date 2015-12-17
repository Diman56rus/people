// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

        .run(function ($rootScope, $ionicPlatform, $ionicPopup, $http) {
            if(window.localStorage["offline"] == "false"){
                $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";

                var tdata = {
                    "cmd": "all_schedule",
                    "group": "ИСб-25"
                };


                var getData = function(){
                    return $http.post("http://vilis8uy.bget.ru/schedule.php", tdata).success(function(data){
                        return data;
                    });
                };


                getData().success(function(data){
                    window.localStorage["schedule"] = JSON.stringify(data);
                });
            }


            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);

                }
                
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });
        })

        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                    .state('app', {
                        url: '/app',
                        abstract: true,
                        templateUrl: 'templates/menu.html',
                        controller: 'AppCtrl'
                    })

                    .state('app.main', {
                        url: '/main',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/main.html',
                                controller: 'ScheduleCtrl'
                            }
                        }
                    })

                    .state('app.schedule', {
                        url: '/schedule',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/schedule.html',
                                controller: 'ScheduleCtrl'
                            }
                        }
                    })

                    .state('app.day', {
                        url: '/day/:id',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/day.html',
                                controller: 'ScheduleCtrl'
                            }
                        }
                    })
                    
                    .state('app.teachers', {
                        url: '/teachers',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/teachers.html',
                                controller: 'TeacherCtrl'
                            }
                        }
                    })

                    .state('app.settings', {
                        url: '/settings',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/settings.html',
                                controller: 'SettingsCtrl'
                            }
                        }
                    });
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/main');
        });

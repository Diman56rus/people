// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

<<<<<<< HEAD
        .run(function ($ionicPlatform) {
=======
        .run(function ($rootScope, $ionicPlatform, $http, $cordovaNetwork) {
            window.localStorage["offline"] = $cordovaNetwork.isOffline();

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


>>>>>>> 3c286985457a82dded54e3f82d01e2cfa0c4cd1c
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

<<<<<<< HEAD
        .service('Schedule', function ($http){
            var apiUrl = 'http://vilis8uy.bget.ru/schedule.php';

            this.getSchedule = function(){
                $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";

                var tdata = {
                    "cmd": "all_schedule",
                    "group": window.localStorage["group"]
                };

                return $http.post(apiUrl, tdata).success(function(info){
                    return info;
                });
            }
        })

=======
>>>>>>> 3c286985457a82dded54e3f82d01e2cfa0c4cd1c
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                    .state('app', {
                        url: '/app',
                        abstract: true,
                        templateUrl: 'templates/menu.html',
<<<<<<< HEAD
                        controller: 'AppCtrl',
                        resolve: {
                            data: function($rootScope, $cordovaNetwork, $ionicPopup, Schedule){
                                window.localStorage["offline"] = $cordovaNetwork.isOffline();
                                // window.localStorage["offline"] = "false";

                                if(!window.localStorage["group"]){
                                    $rootScope.data = {};

                                    return $ionicPopup.show({
                                        templateUrl: 'templates/group-show/group_show.html',
                                        title: 'Введите свою группу',
                                        scope: $rootScope,
                                        buttons: [{
                                            text: '<b>Схоронить</b>',
                                            type: 'button-positive',
                                            onTap: function(e){
                                                if(!$rootScope.data.group || !$rootScope.data.subgroup){
                                                    e.preventDefault();
                                                }else{
                                                    window.localStorage["group"] = $rootScope.data.group;
                                                    window.localStorage["subgroup"] = $rootScope.data.subgroup;
                                                }
                                            }
                                        }]
                                    }).then(function(){
                                        return Schedule.getSchedule().success(function(data){
                                            window.localStorage["schedule"] = JSON.stringify(data);
                                        });
                                    });
                                }
                            }
                        }
=======
                        controller: 'AppCtrl'
>>>>>>> 3c286985457a82dded54e3f82d01e2cfa0c4cd1c
                    })

                    .state('app.main', {
                        url: '/main',
<<<<<<< HEAD
                        cache: false,
=======
>>>>>>> 3c286985457a82dded54e3f82d01e2cfa0c4cd1c
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
<<<<<<< HEAD
                                controller: 'ScheduleCtrl',
=======
                                controller: 'ScheduleCtrl'
>>>>>>> 3c286985457a82dded54e3f82d01e2cfa0c4cd1c
                            }
                        }
                    })

                    .state('app.day', {
                        url: '/day/:id',
<<<<<<< HEAD
                        cache: false,
=======
>>>>>>> 3c286985457a82dded54e3f82d01e2cfa0c4cd1c
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
<<<<<<< HEAD
                        },
                        resolve: {
                            teachers: function($http){
                                if(window.localStorage["offline"] == "false"){
                                    var tdata = {
                                        "cmd": "getteacher",
                                    };

                                    return $http.post("http://vilis8uy.bget.ru/schedule.php", tdata).success(function (data) {
                                        return data;
                                    });
                                }
                            }
=======
>>>>>>> 3c286985457a82dded54e3f82d01e2cfa0c4cd1c
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
<<<<<<< HEAD
        })
=======
        });
>>>>>>> 3c286985457a82dded54e3f82d01e2cfa0c4cd1c

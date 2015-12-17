// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.models', 'ngCordova'])

        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
        })

        .constant('Config', {
            'SITE_URL': 'http://sevgurasp.ru',
            'API_URL': 'http://sevgurasp.ru/api/schedule.php',
            'VERSION': 0.31,
            'DAY_OF_WEEK': [
                {id: 1, title: "Понедельник"},
                {id: 2, title: "Вторник"},
                {id: 3, title: "Среда"},
                {id: 4, title: "Четверг"},
                {id: 5, title: "Пятница"},
                {id: 6, title: "Суббота"}
            ]
        })

        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                    .state('app', {
                        url: '/app',
                        abstract: true,
                        templateUrl: 'templates/menu.html',
                        controller: 'AppCtrl',
                        resolve: {
                            data: function($http, $rootScope, $cordovaNetwork, $ionicPopup, Schedule, Group, Teacher){
                                if(navigator.connection != undefined){
                                    window.localStorage["offline"] = $cordovaNetwork.isOffline();
                                }else{
                                    window.localStorage["offline"] = "false";
                                }

                                if(!window.localStorage["group"]){
                                    $rootScope.data = {};

                                    Group.getGroups().success(function(data){
                                        window.localStorage["groups"] = JSON.stringify(data);
                                        $rootScope.data.groups = JSON.parse(window.localStorage["groups"]);
                                    });

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
                                        return Schedule.getAllSchedule().success(function(data){
                                            window.localStorage["schedule"] = JSON.stringify(data);
                                        });
                                    });
                                }

                                if(!window.localStorage["schedule"] || window.localStorage["offline"] == "false"){
                                    return Schedule.getAllSchedule().success(function(data){
                                        window.localStorage["schedule"] = JSON.stringify(data);
                                    });
                                }

								Teacher.getTeachers().success(function(data){
									window.localStorage["teachers"] = JSON.stringify(data);							
								});
                            }
                        }
                    })

                    .state('app.main', {
                        url: '/main',
                        cache: false,
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
                                controller: 'ScheduleCtrl',
                            }
                        }
                    })

                    .state('app.day', {
                        url: '/day/:id',
                        cache: false,
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
                        },
                    })

                    .state('app.settings', {
                        url: '/settings',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/settings.html',
                                controller: 'SettingsCtrl'
                            }
                        }
                    })

                    .state('app.about', {
                        url: '/about',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/about.html',
                                controller: 'AboutCtrl'
                            }
                        }
                    });
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/main');
        })

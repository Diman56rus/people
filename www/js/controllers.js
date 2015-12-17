angular.module("starter.controllers", [])
        .controller("AppCtrl", function ($scope, $ionicPopup, data) {
            if (window.localStorage["offline"] == "true" && !window.localStorage["schedule"]){
                $ionicPopup.alert({
                    title: "Добро пожаловать!",
                    template: "Для нормального функционирования приложения нужно подключение к интернету, всего лишь 1 раз :-)"
                });
            }
        })

        .controller("ScheduleCtrl", function ($scope, $state, $interval, Config, Schedule) {
            $scope.go = function(){
                window.open(Config.SITE_URL + '?r=phone/index', '_system', 'location=yes');
            }

            $interval(function(){
                $scope.diff = function(date_start, date_end){
                    return Schedule.difference(date_start, date_end);
                };
            }, 1000);

            $scope.getDayNum = function(){
                var num = $state.params;
                var date = new Date().getDay();
                num = (typeof num["id"] == "undefined") ? date : num["id"];

                return num;
            };

            $scope.cur_date = new Date();
            $scope.dayOfWeek = Config.DAY_OF_WEEK;
            $scope.msg = Schedule.getSchedule($scope.getDayNum());

            var hour = $scope.cur_date.getHours();
            var minute = $scope.cur_date.getMinutes();
            var second = "00";

            $scope.date = (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute) + ":" + second;
        })

        .controller("TeacherCtrl", function ($scope) {
            $scope.teachers = JSON.parse(window.localStorage["teachers"]);
        })

        .controller("SettingsCtrl", function ($scope, $ionicPopup, Schedule){
            $scope.settings = {
                "group": window.localStorage["group"],
                "subgroup": window.localStorage["subgroup"]
            };

            $scope.settings.groups = JSON.parse(window.localStorage["groups"]);

            $scope.savesettings = function(){
                window.localStorage["group"] = $scope.settings.group;
                window.localStorage["subgroup"] = $scope.settings.subgroup;

                $ionicPopup.alert({
                    title: "Успешно!",
                    template: "Настройки успешно сохранены"
                }).then(function(){
                    Schedule.getAllSchedule().success(function(data){
                        window.localStorage["schedule"] = JSON.stringify(data);
                    });
                });
            };

            $scope.offline = window.localStorage["offline"];
        })

        .controller("AboutCtrl", function ($scope, Config){
            $scope.go = function(){
                window.open(Config.SITE_URL, '_system', 'location=yes');
            }
        });

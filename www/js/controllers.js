angular.module("starter.controllers", [])
        .controller("AppCtrl", function ($scope, $timeout, $ionicPopup) {
            if(window.localStorage["offline"] == "true" && window.localStorage["schedule"] == "undefined"){
                $ionicPopup.alert({
                    title: "Добро пожаловать!",
                    template: "Для нормального функционирования приложения нужно подключение к интернету, всего лишь 1 раз :-)"
                });
            }   
        })

        .controller("ScheduleCtrl", function ($scope, $state) {
            var time = function (time) {
                return time / 1000 / 60 / 60 / 24;
            };

            $scope.dayOfWeek = [
                {id: 1, title: "Понедельник"},
                {id: 2, title: "Вторник"},
                {id: 3, title: "Среда"},
                {id: 4, title: "Четверг"},
                {id: 5, title: "Пятница"},
                {id: 6, title: "Суббота"}
            ];

            var weekNumber = function () {
                var weekNumber;
                var yearStart;
                var ts;

                ts = new Date();

                ts.setHours(0, 0, 0);
                ts.setDate(ts.getDate() + 4 - (ts.getDay() || 7));

                yearStart = new Date(ts.getFullYear(), 0, 1);

                weekNumber = Math.floor((time(ts - yearStart) + 1) / 7);

                return weekNumber;
            };

            var getCurrent = function(num, arr){
                var data = JSON.parse(arr);
                var week = (weekNumber() % 2 == 0) ? "even" : "odd";
                var res = [];

                for(var i = 0; i < data.length; i++){
                    if(data[i].day == num && data[i].week == week){
                        res.push(data[i]);
                    }
                }

                return res;
            };

            var getSchedule = function(num) {
                var tmp =  window.localStorage["schedule"];

                return getCurrent(num, tmp);
            };

            var getSecond = function(date_receive){
                var parts = date_receive.split(':');
                return parts[0] * 3600 + parts[1] * 60 + parts[2];
            };

            $scope.diff = function (date1, date2) {
                var d1 = getSecond(date1); // текущая
                var d2 = getSecond(date2); // конец пары

                return 100 - (d2 - d1).toFixed(2) / 5400 + "%";
            };

            $scope.getSc = function(){
                var num = $state.params;
                var date = new Date().getDay();
                num = (typeof num["id"] == "undefined") ? date : num["id"];

                return num;
            };

            var date = new Date();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = "00";

            $scope.date = (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute) + ":" + second;

            $scope.msg = getSchedule($scope.getSc());
        })

        .controller("TeacherCtrl", function ($scope, $http) {
            var tdata = {
                "cmd": "getteacher",
            };

            if(window.localStorage["offline"] == "false"){
                $http.post("http://vilis8uy.bget.ru/schedule.php", tdata).success(function (data) {
                    window.localStorage["teachers"] = JSON.stringify(data);
                });
            }

            $scope.teachers = window.localStorage["teachers"];
        })

        .controller("SettingsCtrl", function ($scope, $cordovaNetwork, $ionicPopup){
            $scope.cleardata = function(){
                window.localStorage["schedule"] = "undefined";

                $ionicPopup.alert({
                    title: "Удалено!",
                    template: "Информация успешно удалена"
                });
            };

            $scope.offline = $cordovaNetwork.isOffline();
            window.localStorage["offline"] = $scope.offline;
        });

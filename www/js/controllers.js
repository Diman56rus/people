angular.module("starter.controllers", [])
        .controller("AppCtrl", function ($scope, $ionicPopup, data) {
            if (window.localStorage["offline"] == "true" && !window.localStorage["schedule"]){
                $ionicPopup.alert({
                    title: "Добро пожаловать!",
                    template: "Для нормального функционирования приложения нужно подключение к интернету, всего лишь 1 раз :-)"
                });
            }
        })

        .controller("ScheduleCtrl", function ($http, $scope, $state) {
            $scope.go = function(){
                window.open('http://vilis8uy.bget.ru/index.php?r=phone/index', '_system', 'location=yes');
            }

            var getVersion = function(){
                $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";

                var tdata = {
                    "cmd": "getversion",
                };

                return $http.post("http://vilis8uy.bget.ru/schedule.php", tdata).success(function(info){
                    return info;
                });
            };

            getVersion().then(function(data){
                if(!window.localStorage["version"] || window.localStorage["version"] < data.data){
                    $scope.version = data.data;
                    $scope.has_update = 1;
                }
            });

            $scope.update = function(){
                window.localStorage["version"] = $scope.version;
                $scope.has_update = 0;
            };

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
                    if(data[i].day == num && data[i].week == week && (data[i].stud_subgroup == window.localStorage["subgroup"] || data[i].stud_subgroup == 3)){
                        res.push(data[i]);
                    }
                }

                return res;
            };

            var getSchedule = function(num) {
                var tmp = window.localStorage["schedule"];
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

        .controller("TeacherCtrl", function ($scope, $http, teachers) {
            if(window.localStorage["offline"] == "false")
                window.localStorage["teachers"] = JSON.stringify(teachers.data);

            $scope.teachers = JSON.parse(window.localStorage["teachers"]);
        })

        .controller("SettingsCtrl", function ($scope, $ionicPopup, Schedule){
            $scope.settings = {
                "group": window.localStorage["group"],
                "subgroup": window.localStorage["subgroup"]
            };

            $scope.cleardata = function(){
                var dialog = $ionicPopup.confirm({
                    title: "Подтверждение!",
                    template: "Действительно удалить кэш?"
                });

                dialog.then(function(data){
                    if(data){
                        window.localStorage.removeItem("schedule");
                    }
                });
            };

            $scope.savesettings = function(){
                window.localStorage["group"] = $scope.settings.group;
                window.localStorage["subgroup"] = $scope.settings.subgroup;

                $ionicPopup.alert({
                    title: "Успешно!",
                    template: "Настройки успешно сохранены"
                }).then(function(){
                    Schedule.getSchedule().success(function(data){
                        window.localStorage["schedule"] = JSON.stringify(data);
                    });
                });
            };

            $scope.offline = window.localStorage["offline"];
        });

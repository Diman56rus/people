angular.module('starter.controllers', [])
        .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

            $scope.loginData = {};

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/login.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            $scope.closeLogin = function () {
                $scope.modal.hide();
            };

            $scope.login = function () {
                $scope.modal.show();
            };

            // Perform the login action when the user submits the login form
            $scope.doLogin = function () {
                console.log('Doing login', $scope.loginData);

                $timeout(function () {
                    $scope.closeLogin();
                }, 1000);
            };
        })

        .controller('ScheduleCtrl', function ($scope, $http) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

            $scope.timediff = function (start, end) {
                return moment.utc(moment(end).diff(moment(start))).format("mm");
            }

            var d = new Date().getDay();

            $scope.time = function (time) {
                return time / 1000 / 60 / 60 / 24;
            };

            $scope.weekNumber = function () {
                var weekNumber;
                var yearStart;
                var ts;

                ts = new Date();

                ts.setHours(0, 0, 0);
                ts.setDate(ts.getDate() + 4 - (ts.getDay() || 7));

                yearStart = new Date(ts.getFullYear(), 0, 1);

                weekNumber = Math.floor(($scope.time(ts - yearStart) + 1) / 7);

                return weekNumber;
            };
            
            var tdata = {
                'cmd': 'schedule',
                'group': 'ИСб-25',
//                'day_num': d
                'day_num': 6,
                'week': $scope.weekNumber() % 2
            };

            $http.post('http://localhost/raspisanie/schedule.php', tdata).success(function (data) {
                $scope.schedule = [];
                for (var i = 0; i < data.length; i++) {
                    $scope.schedule.push(JSON.parse(JSON.stringify(data[i])));
                }

                $scope.date = new Date();
                var hour = $scope.date.getHours();
                var minute = $scope.date.getMinutes();
                var second = $scope.date.getSeconds();

                $scope.date = hour + ":" + (minute < 10 ? '0' + minute : minute) + ":" + second;

                $scope.diff = function (date1, date2) {
                    var date = new Date();

                    var d1 = Math.round(+new Date(date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay() + " " + date1) / 1000);
                    var d2 = Math.round(+new Date(date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay() + " " + date2) / 1000);

                    return 100 - Math.round((d2 - d1) / 100) + "%";
                };
            });
        })

        .controller('TeacherCtrl', function ($scope, $http) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

            var tdata = {
                'cmd': 'getteacher',
            };

            $http.post('http://localhost/raspisanie/schedule.php', tdata).success(function (data) {
                $scope.teachers = data;
            });
        });

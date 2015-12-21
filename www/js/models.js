angular.module("starter.models", [])

	.run(function($http, Config){
		this.getVersion = function(){
            var request = "?cmd=getversion";

            return $http.get(Config.API_URL + request).success(function(info){
                return info;
            });
        };

        getVersion().then(function(data){
            if(Config.VERSION < data.data){
                window.localStorage["has_update"] = 1;
            }
        });
	})

	.service("Schedule", function($http, Config){
		this.getAllSchedule = function(){
		    var request = "?cmd=all_schedule&group=" + window.localStorage["group"];

            return $http.get(Config.API_URL + request).success(function(info){
                return info;
            });
        }

        this.getCurrent = function(num, arr){
            var data = JSON.parse(arr);
            var week = window.localStorage["week"];
            var res = [];

            for(var i = 0; i < data.length; i++){
                if(data[i].day == num && data[i].week == week && (data[i].stud_subgroup == window.localStorage["subgroup"] || data[i].stud_subgroup == 3)){
                    res.push(data[i]);
                }
            }

            return res;
        };

        this.time = function(date){
        	return date / 1000 / 60 / 60 / 24;
        }

        this.weekNumber = function () {
            var weekNumber;
            var yearStart;
            var ts;

            ts = new Date();

            ts.setHours(0, 0, 0);
            ts.setDate(ts.getDate() + 4 - (ts.getDay() || 7));

            yearStart = new Date(ts.getFullYear(), 0, 1);

            weekNumber = Math.floor((this.time(ts - yearStart) + 1) / 7);

            if(!window.localStorage["week"])
            	window.localStorage["week"] = (weekNumber % 2 == 0) ? "even" : "odd";

            return weekNumber;
        };

        this.getSchedule = function(num) {
            var tmp = window.localStorage["schedule"];
            return this.getCurrent(num, tmp);
        };

        this.getSecond = function(date_receive){
            var parts = date_receive.split(':');
            return parts[0] * 3600 + parts[1] * 60 + parts[2];
        };

        this.difference = function (date_start, date_end) {
            var d1 = this.getSecond(date_start); // начало пары
            var d2 = this.getSecond(date_end); // конец пары
            var diffMins = ((d2 - d1) / 100); // длительность пары
            var cur_date = new Date();

            var current = cur_date.getHours() + ":" + cur_date.getMinutes() + ":" + cur_date.getSeconds();

			return (100 - (d2 - this.getSecond(current)) / diffMins).toFixed(2);
            var current = cur_date.getHours() + ":" + cur_date.getMinutes() + ":00";

            return 100 - (d2 - this.getSecond(current)) / diffMins;
        };
	})


	.service("Group", function($http, Config){
		this.getGroups = function(){
			var request = "?cmd=getgroups";

            return $http.get(Config.API_URL + request).success(function(info){
                return info;
            });
		}
	})


	.service("Teacher", function($http, Config){
		this.getTeachers = function(){
			var request = "?cmd=getteacher";

		    return $http.get(Config.API_URL + request).success(function (data) {
		        return data;
		    });
		}
	})

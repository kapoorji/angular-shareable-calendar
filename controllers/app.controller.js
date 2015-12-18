angular.module('app').controller('AppCtrl', function($scope, $filter, $rootScope) {
  this.activeDate;
  this.selectedDates = [new Date().setHours(0, 0, 0, 0)];
  this.dayWrapper = moment(this.selectedDates[0]);
  this.type = 'individual';
  this.dates = {};
  this.ranges = {};
  this.identity = angular.identity;
  this.addFromSelected = function(index , d) {
	  var dateNew = $filter('date')(d,'d'); // finding the date number
      this.dates[d]['date'] = $filter('date')(d,'d');
	  this.dates[dateNew] = this.dates[d];
	  this.dates[dateNew]['class'] = 'caligntop';
	  this.dates[dateNew]['wrapperClass'] =  'cwrapperlink';
	  this.dates[dateNew]['boxClass'] = 'cboxgrey';
	  delete this.dates[d];
	  this.dayWrapper = moment(this.selectedDates[0]);
	  this.selectedDates.splice(index, 1);
  };
  this.defaultsSet = function(){
	  var monthString = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	  var firstDay = new Date(this.dayWrapper.year(), this.dayWrapper.month(), 1);
	  var lastDay = new Date(this.dayWrapper.year(), this.dayWrapper.month() + 1, 0);
	  $rootScope.currentYear = this.dayWrapper.year();
	  var currentMonth = this.dayWrapper.month();
	  $rootScope.currentMonth = monthString[currentMonth];
	  this.first = $filter('date')(firstDay, 'd');
	  this.last = $filter('date')(lastDay, 'd');
	  this.startDay = $filter('date')(firstDay, 'EEEE');
  };
  this.addRange = function(dts, rangeParams){
	  var startDate = $filter('date')($filter('orderBy')(dts)[0], 'd');
	  var endDate = $filter('date')($filter('orderBy')(dts, '-')[0], 'd');
	  var rangeValue = endDate - startDate;
	  var obj = {
	  	 startDate : startDate,
		 endDate :	endDate,
		 range : rangeValue,
		 link : rangeParams.link,
		 desc : rangeParams.desc,
		 leftText : rangeParams.leftText,
		 rightText : rangeParams.rightText,
		 wrapperClass : 'cwrapperlink cwidth'+rangeValue,
		 class : 'caligntop',
		 boxClass : 'cboxgrey',
		 rangeMargin : 'rangeMargin'
	  };
	  this.ranges[startDate] = obj;
	  this.range = {};
	  this.selectedDates = [];
  };
  this.generateCalendar = function(){
	  this.defaultsSet();
	  this.htmlCalendar = true;
	  $rootScope.month = [
	  [],[],[],[],[],[]];
	      if(this.startDay == 'Monday'){
			   $rootScope.month[0].push({});
		   }
		   if(this.startDay == 'Tuesday'){
			   $rootScope.month[0].push({});
			   $rootScope.month[0].push({});
		   }
		   if(this.startDay == 'Wednesday'){
			   $rootScope.month[0].push({});
			   $rootScope.month[0].push({});
			   $rootScope.month[0].push({});
		   }
		   if(this.startDay == 'Thursday'){
			   $rootScope.month[0].push({});
			   $rootScope.month[0].push({});
			   $rootScope.month[0].push({});
			   $rootScope.month[0].push({});
		   }
		   if(this.startDay == 'Friday'){
			   $rootScope.month[0].push({});
			   $rootScope.month[0].push({});
			   $rootScope.month[0].push({});
			   $rootScope.month[0].push({});
			   $rootScope.month[0].push({});
		   }
		   if(this.startDay == 'Saturday'){
			   $rootScope.month[0].push({});
			   $rootScope.month[0].push({});
			   $rootScope.month[0].push({});
			   $rootScope.month[0].push({});
			   $rootScope.month[0].push({});
			   $rootScope.month[0].push({});
		   }
		   var week = 0;
			for(var i = 1; i<=31; i++){
				var obj = {
				date : i,
				class : 'calignmiddle'
				} 
			$rootScope.month[week].push(obj);
			if($rootScope.month[week].length == 7){
				++week;
			}
			if(i == this.last)
				break;
		}
		//this.month = angular.extend({}, this.month, this.dates);
		for(var i in $rootScope.month){
			for(var j in $rootScope.month[i]){
				if($rootScope.month[i][j]['date'] != undefined && this.dates[$rootScope.month[i][j]['date']] != undefined ){
					if($rootScope.month[i][j]['date'] == this.dates[$rootScope.month[i][j]['date']].date){
							$rootScope.month[i][j] = this.dates[$rootScope.month[i][j].date];
						}
				}

				if($rootScope.month[i][j]['date'] != undefined && this.ranges[$rootScope.month[i][j]['date']] != undefined){
					if($rootScope.month[i][j]['date'] == this.ranges[$rootScope.month[i][j]['date']].startDate){
							$rootScope.month[i][j] = this.ranges[$rootScope.month[i][j].date];
							var rangeValue = $rootScope.month[i][j].range;
							var newj = Number(j);
							var newi = Number(i);
							for(var x = 1; x < rangeValue; x++){
								var newj = x + Number(j);
								/*if(newj > 6){
									newi = ++newi;
									newj =  0;
								}*/
								$rootScope.month[newi][newj]['class'] = 'caligntop';
							}
						}
				}
			}
		}
  };
});
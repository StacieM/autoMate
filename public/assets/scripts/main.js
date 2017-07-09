
      var d = new Date(), // get computer date
      month = d.getMonth()+1,
      day = d.getDate(),
      year = d.getFullYear(),
      setMonth = year + "-" + month,
      today = month + "-" + day + "-" + year,
      pickupMin,
      dropoffMin;
      $("#pickup").val("Today");
      $("#pickup2").val("Today");

      $(document).ready(function() {
        $("#cal").responsiveCalendar({
          time: setMonth // set calendar to current month
        });
        var calendar = document.getElementById("cal");
        $(".today a").attr("style", "background-color: gold");
      });

      // ONE WAY or ROUND TRIP
      $(".oneTwoWay").click(function() {
        if (event.target.value === "oneWay") {
            $("#cal2").attr("style", "display: none;");
            $(".days2 .day a").attr("style", "background-color: #fff");
            $("#pickup2").val("Today");
        }
        else {
            $("#cal2").attr("style", "display: inline-block;");
            $(".days .day a").attr("style", "background-color: #fff");
            $("#pickup").val("Today");
            $("#cal2").responsiveCalendar({
              time: setMonth // set calendar to current month
            });
            var calendar2 = document.getElementById("cal2");
            $(".today a").attr("style", "background-color: gold");
        }
      });

      // RECURRING DAYS
      $(".recurring").click(function() {
        // console.log($(this).val());
        if ($(this).val() != "no") {
          $("#recurDays").show();
        }
        else {
          $("#recurDays").hide();
        }
      });

      // INITIAL TRIP CALENDAR
      $(".days").click(function() {
        $(".days .day a").attr("style", "background-color: #fff");
        event.target.setAttribute("style", "background-color: gold");
        var selYear = event.target.getAttribute("data-year");
        var selMonth = event.target.getAttribute("data-month");
        var selDay = event.target.getAttribute("data-day");
        $("#pickup").val(selMonth + "-" + selDay + "-" + selYear);
      });

      var dates = angular.module('datePicker', []);
      dates.controller('dateCtrl', function($scope) {        
          $scope.pickup = "Today";
      });

      // RETURN TRIP CALENDAR
      $(".days2").click(function() {
        $(".days2 .day a").attr("style", "background-color: #fff");
        event.target.setAttribute("style", "background-color: gold");
        var selYear = event.target.getAttribute("data-year");
        var selMonth = event.target.getAttribute("data-month");
        var selDay = event.target.getAttribute("data-day");
        $("#pickup2").val(selMonth + "-" + selDay + "-" + selYear);
      });

      var dates2 = angular.module('datePicker2', []);
      dates2.controller('dateCtrl2', function($scope) {        
          $scope.pickup2 = "Today";
      });



    /*GOOGLE MAP*/

      var address1Full;
      var address2Full;
      angular.module("addressApp", []);

      angular.module("addressApp").controller("myCtrl", function($scope) {
        $scope.getDates = function() {
          console.log($scope.pickup);
          console.log($scope.dropoff)
        }
          $scope.addressFunc = function() {
          var address1 = $scope.addressInput;
          var city1 = $scope.cityInput;
          var state1 = $scope.stateInput;
          var address2 = $scope.address2Input;
          var city2 = $scope.city2Input;
          var state2 = $scope.state2Input;
          if ($scope.addressInput && $scope.cityInput && $scope.stateInput && $scope.address2Input && $scope.city2Input && $scope.state2Input) {
            address1Full = address1 + ", " + city1 + ", " + state1;
            address2Full = address2 + ", " + city2 + ", " + state2;
            initMap();
          }
        };
      })

      function initMap() {        
        var bounds = new google.maps.LatLngBounds;
        var markersArray = [];
        address1Full = address1Full || "'Irvine Station, Irvine, CA";
        address2Full = address2Full || "'Irvine Station, Irvine, CA";
        var origin1 = address1Full;
        // var origin2 = ;
        var destinationA = 'Irvine Station, Irvine, CA';
        var destinationB = address2Full;
        // var destinationB = 'In-n-out, Campus Drive, Irvine, CA';

        var destinationIcon = 'https://chart.googleapis.com/chart?' +
            'chst=d_map_pin_letter&chld=D|FF0000|000000';
        var originIcon = 'https://chart.googleapis.com/chart?' +
            'chst=d_map_pin_letter&chld=O|FFFF00|000000';
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 33.656738, lng: -117.733533},
          zoom: 10,
          scrollwheel: false
        });

        var geocoder = new google.maps.Geocoder;
        var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
          origins: [origin1/*, origin2*/],
          destinations: [destinationA, destinationB],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;
            deleteMarkers(markersArray);

            var showGeocodedAddressOnMap = function(asDestination) {
              var icon = asDestination ? destinationIcon : originIcon;
              return function(results, status) {
                if (status === 'OK') {
                  map.fitBounds(bounds.extend(results[0].geometry.location));
                  markersArray.push(new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    icon: icon
                  }));
                } else {
                  alert('Geocode was not successful due to: ' + status);
                }
              };
            };

            for (var i = 0; i < originList.length; i++) {
              var results = response.rows[i].elements;
              geocoder.geocode({'address': originList[i]},
                  showGeocodedAddressOnMap(false));
              for (var j = 0; j < results.length; j++) {
                geocoder.geocode({'address': destinationList[j]},
                    showGeocodedAddressOnMap(true));
                // console.log(destinationList[j]);
              }
              pickupMin = results[0].duration.text;
              dropoffMin = results[1].duration.text;
            }
          }
        });
      }
      function deleteMarkers(markersArray) {
        for (var i = 0; i < markersArray.length; i++) {
          markersArray[i].setMap(null);
        }
        markersArray = [];
      }

      /*FORM SUBMIT*/
     // $("form").submit(function(){      
       $("form").on("click",function(event){      
        event.preventDefault();

        // fill array with recurring pickup days
        var recurringDays = [];
// var recurringDays        
        for (var i=0; i<schedule.recurDays.length; i++) {
          if (schedule.recurDays[i].checked) {
            recurringDays.push(schedule.recurDays[i].value);
          }
        }
        console.log(schedule.oneTwoWay.value); // one way or round trip choice
        console.log(schedule.recurring.value); // recurring pickup choice
var tripType = schedule.oneTwoWay.value;
var recurring = schedule.recurring.value;        
        if (schedule.recurring.value != "no") { // recurring days if selected
          console.log(recurringDays);
var recurDays = recurringDays.join();
          console.log(recurDays);
        }        
        console.log(schedule.passengers.value); // number of passengers
        console.log(schedule.vehicle.value); // vehicle type
        console.log(address1Full); // pickup address
        console.log(address2Full); // drop off address
var passengers = schedule.passengers.value;
var vehicle = schedule.vehicle.value;
// var address1Full
// var address2Full      
        if (schedule.pickup.value === "Today") { // today's date if 'Today'
          console.log(today);
        }
        else {
          console.log(schedule.pickup.value); // any date other than 'Today'
        }
var pickup1 = schedule.pickup.value;
// var pickup2 = schedule.pickup2.value;
        
        var time1 = schedule.time.value; // pickup time
        var time2 = schedule.time2.value; // two way pickup time
        var ampm1 = schedule.ampm.value; // pickup am/pm choice
        var ampm2 = schedule.ampm2.value; // two way pickup am/pm choice
        if (d.getHours() > 12) { // convert to 12 hour format and set to 'pm'
          var hours = d.getHours()-12;
          ampm1 = "pm";
          ampm2 = "pm";
        }
        else { // set to 'am' if less 12 or less
          ampm1 = "am";
          ampm2 = "am";
        }
        if (d.getMinutes() < 10) { // add a preceding '0' if less than 10 minutes
          var minutes = 0 + d.getMinutes().toString();
        }
        else { // create 'minutes' variable for greater than 10 minutes
          var minutes = d.getMinutes().toString();
        }
        if (time1 === "Now") { // create variable if pickup is 'Now'
          time1 = hours + ":" + minutes;
        }
        if (time2 === "Now") { // create variable if two way pickup is 'Now'
          time2 = hours + ":" + minutes;
        }
        time1 += ampm1; // add am/pm to pickup time
        time2 += ampm2; // add am/pm to drop off time
        console.log(time1); // pickup time

        if (schedule.oneTwoWay.value != "oneWay") { // if 'Round Trip' selected
          if (schedule.pickup2.value === "Today") { // if two way is 'Today'
            console.log(today); // today's date
          }
          else {
            console.log(schedule.pickup2.value); // two way date
          }
          console.log(time2); // two way time
        }
// var time1
// var time2
        console.log(pickupMin);
        console.log(dropoffMin);
// var pickupMin
// var dropoffMin
var cost = ("$" + (25.00).toFixed(2));
        console.log(cost);








        var newSchedule = {
            trip: tripType,
            recurring: recurring,
            recurringDay: recurDays,
            passengers: passengers,
            vehicleType: vehicle,
            addressA: address1Full,
            dayA: pickup1,
            timeA: time1,
            addressB: address2Full,
            dayB: pickup2,
            timeB: time2,
            pickupMin: pickupMin,
            dropoffMin: dropoffMin,
            cost: cost
        };
        $.post("/api/newSchedule", newSchedule)
            .done(function (data) {
                //console.log(data);
                 alert("Your profile has been submitted");
            });
              // console.log(newSchedule);  
      });
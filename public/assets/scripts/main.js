
/********** GLOBAL VARIABLES ************/
var d = new Date(), // get computer date
month = d.getMonth()+1,
day = d.getDate(),
year = d.getFullYear(),
setMonth = year + "-" + month,
today = month + "-" + day + "-" + year,
tripType,
recurring,
recurDays,
passengers,
vehicle,
pickupMin,
dropoffMin,
address1Full,
address2Full,
cost;

document.onreset = function(){
    $("#resultsTab").slideUp();
    $("#resultsTab p:nth-of-type(2)").show();
    tripType = "",
    recurring = "",
    recurDays = "",
    passengers = "",
    vehicle = "",
    pickupMin = "",
    dropoffMin = "",
    address1Full = "",
    address2Full = "",
    cost = "";
}

/********* SCHEDULE PAGE *************/
function scheduler() {
  $("#pickup").val("Today");
  $("#pickup2").val("Today");
  // $(document).ready(function() {
    $("#cal").responsiveCalendar({
      time: setMonth // set calendar to current month
    });
    var calendar = document.getElementById("cal");
    $(".today a").attr("style", "background-color: gold");
  // });

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

  // AngularJS address to map data binding
  angular.module("addressApp", []);
  angular.module("addressApp").controller("addressCtrl", function($scope) {
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


      $scope.reset = function() {
        $scope.addressFunc = {};
      };


  });
}



/******** GOOGLE MAP ********/
function initMap() {        
  var bounds = new google.maps.LatLngBounds;
  var markersArray = [];
  address1Full = address1Full || "Irvine City Hall, Irvine, CA";
  address2Full = address2Full || "UC Irvine, Irvine, CA";
  var origin1 = address1Full;
  var destinationA = 'Irvine Station, Irvine, CA';
  var destinationB = address2Full;

  // var destinationIcon = 'https://chart.googleapis.com/chart?' +
  //     'chst=d_map_pin_letter&chld=D|FF0000|000000';
  // var originIcon = 'https://chart.googleapis.com/chart?' +
  //     'chst=d_map_pin_letter&chld=O|FFFF00|000000';
  var destinationIcon = 'assets/images/map-car-marker.png';
  var originIcon = 'assets/images/map-house-marker.png';
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 33.656738, lng: -117.733533},
    zoom: 10,
    scrollwheel: false
  });

  // First destination AutoMate logo
  var image = 'assets/images/map-logo-marker.png';
  var beachMarker = new google.maps.Marker({
    position: {lat: 33.656738, lng: -117.733533},
    map: map,
    icon: image
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

        // console.log(pickupMin);
        // console.log(dropoffMin); // this could be '1 day 3 hours', '2 hours 15 min' or '20 min'
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




/********** RESULTS TAB ***********/
$("#cal").click(function(){
  // function to initial cap addresses
  function titleCase(str) {
     str = str.toLowerCase().split(' '); // split string into array of words
     for(var i = 0; i < str.length; i++){ // loop through each word
          str[i] = str[i].split(''); // split each word into array of letters
          str[i][0] = str[i][0].toUpperCase(); // convert first letter to uppercase
          str[i] = str[i].join(''); // convert back into a word
     }
     return str.join(' '); //  convert back to string
  }

  // fill array with recurring pickup days
  var recurringDays = [];        
  for (var i=0; i<schedule.recurDays.length; i++) {
    if (schedule.recurDays[i].checked) {
      recurringDays.push(schedule.recurDays[i].value);
    }
  }
  // console.log(schedule.oneTwoWay.value); // one way or round trip choice
  // console.log(schedule.recurring.value); // recurring pickup choice
  tripType = schedule.oneTwoWay.value;
  recurring = schedule.recurring.value;        
  if (schedule.recurring.value != "no") { // recurring days if selected
  // console.log(recurringDays);
  recurDays = recurringDays.join();
  // console.log(recurDays);
  }        
  // console.log(schedule.passengers.value); // number of passengers
  // console.log(schedule.vehicle.value); // vehicle type
  // console.log(titleCase(address1Full)); // pickup address
  // console.log(titleCase(address2Full)); // drop off address
  passengers = schedule.passengers.value;
  vehicle = schedule.vehicle.value;

  console.log(pickupMin);
  console.log(dropoffMin); // this can be '1 day 3 hours 20 min'

  // Calculate cost
  var dhmArray = [];
  dropoffMinCalc = dropoffMin.split(" "); // make array of dropoffMin
  for (var i=0; i<dropoffMinCalc.length; i++) {
    var number = parseInt(dropoffMinCalc[i]); // convert to number to turn day,days,hour,hours,min into NaN
    if (!isNaN(number)) { // find numbers
      dhmArray.push(number); // push numbers into array
    }
  }

  dhmArray = dhmArray.reverse(); // reverse to put minutes at index[0]
  if (/day/.test(dropoffMin)) { // if time includes days          
    var hours = dhmArray[0] * 60; // hours converted to minutes
    var days = dhmArray[1] * 1440; // days converted to minutes
    cost = days + hours;
  }  
  else if (/min/.test(dropoffMin)) { // if time includes min          
    var minutes = dhmArray[0]; // total minutes
    if (dhmArray[1]) { // hours exist
      var hours = dhmArray[1] * 60; // hours converted to minutes
      cost = hours + minutes;
    }
    else { // only minutes
      cost = minutes
    }
  }  
  // adjust cost by vehicle type
  switch (vehicle) {
    case "economy":
      cost = cost * 0.5; // 50 cents per minute
    break;
    case "midSize":
      cost = cost * 0.6; // 60 cents per minute
    break;
    case "luxury":
      cost = cost * 0.8; // 80 cents per minute
    break;
    case "carpool":
      cost = cost * 0.3; // 30 cents per minute
    break;
  }
  // Adjust cost if round trip
  if (tripType != "oneWay") {
    cost = "$" + (cost * 2).toFixed(2);
  }
  else {
    cost = "$" + cost.toFixed(2);
  }
  // console.log(cost);

  // Populate results tab
  $("#resultsTab").slideDown();
  $("#price").html(cost);
  if (schedule.time.value != "Now") {
    $("#resultsTab p:nth-of-type(2)").hide();
  }
  $("#arrivalMinutes").html(pickupMin);
  $("#rideMinutes").html(dropoffMin);

  console.log(pickupMin);
  console.log(dropoffMin);
});





/* SCHEDULE FORM SUBMIT */
$("#scheduleSubmit").click(function(){      
  // event.preventDefault();




  




  if (schedule.pickup.value === "Today") { // today's date if 'Today'
    // console.log(today);
  }
  else {
    // console.log(schedule.pickup.value); // any date other than 'Today'
  }
  var pickup1 = schedule.pickup.value;
  if (schedule.pickup2.value === "Today") { // today's date if 'Today'
    // console.log(today);
  }
  else {
    // console.log(schedule.pickup2.value); // any date other than 'Today'
  }










  var pickup2 = schedule.pickup2.value;
  
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
    var hours = d.getHours();
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
  if (time2 === "Now") { // create variable if round trip pickup is 'Now'
    time2 = hours + ":" + minutes;
  }
  time1 += ampm1; // add am/pm to pickup time
  time2 += ampm2; // add am/pm to drop off time
  // console.log(time1); // pickup time








  if (schedule.oneTwoWay.value != "oneWay") { // if 'Round Trip' selected
    if (schedule.pickup2.value === "Today") { // if two way is 'Today'
      // console.log(today); // today's date
    }
    else {
      // console.log(schedule.pickup2.value); // round trip date
    }
    // console.log(time2); // round trip time
  }









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
        // This is where we get 
        // console.log("\n\n\n" + data.id + "\n\n\n");
        // $.get("/api/newSchedule/" + data.id).done(function(data){});
  });
  // console.log(newSchedule);  
});
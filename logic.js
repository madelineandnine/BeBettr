$(document).ready(function () {
  $('#modal1').modal();
  $('#modal2').modal();
});



$('.modal-action').on('click', function () { 
  var modalcontent2 = $('#modal2');
  var modalcontent3 = $('#modal3');
  var modalcontent4 = $('#modal4')
  $('#events').append(modalcontent2);
  $("#events").append(modalcontent3);
  $("#events").append(modalcontent4);
});
  

  
var config = {
  apiKey: "AIzaSyBTHFUMra78azqRFd4FCHgHKuwgwveponA",
  authDomain: "daytrippr-8e200.firebaseapp.com",
  databaseURL: "https://daytrippr-8e200.firebaseio.com",
  projectId: "daytrippr-8e200",
  storageBucket: "daytrippr-8e200.appspot.com",
  messagingSenderId: "138915316080"
};

firebase.initializeApp(config);

var database = firebase.database();

var category

var firstName = "";
var lastName = "";
var email = "";
var zipCode = "";
var temperature; 

$(".modal-close").on("click", function () {

  // Don't refresh the page!
  event.preventDefault();

  firstName = $("#first_name").val().trim();
  lastName = $("#last_name").val().trim();
  email = $("#email").val().trim();
  zipCode = $("#zipcode").val().trim();

  console.log(firstName);
  console.log(lastName); 
  console.log(email); 
  console.log(zipCode); 

  getWeather();
  
  getEvents();
 // location.href = "your-day.html"


});


function getWeather() {

  var weatherQueryURL = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + ",us&appid=949dca9cddf77db7c038faccb85305aa";
  console.log(weatherQueryURL);

  $.ajax({
    url: weatherQueryURL,
    method: "GET"
  }).then(function (response) {
    
    console.log(response);
    var todayWeather = response.main.temp;

    database.ref().push({
      firstName: firstName,
      lastName: lastName,
      email: email,
      zipCode: zipCode,
      temperature: response.main.temp,
      dateAdded: firebase.database.ServerValue.TIMESTAMP

    }).then(function() {
      location.href = "your-day.html"
    });

    
    $(".weather").text("Temperature (F) " + temperature);

  });
}

    



  function getPlacesInfo() {

    var placesQueryURL = "https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=AIzaSyB_ZFo0o7HLPDOUTX9KDXo77zEM9OtrDu8";

    $.ajax({
      url: placesQueryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);

    });
  }


  
  function getEvents() {
    var zip = $("#zipcode").val();
    var eventsQueryURL = "https://api.eventful.com/rest/events/search?q="+zip+"&within=25&units=miles&app_key=JJR9n4PwkWr8G2dp";
debugger
    $.ajax({
      url: eventsQueryURL,
      method: "GET",
      dataType: 'JSON'
    }).then(function (response) {
      console.log(response);
      var $response = $(response);
      $response.find('event').each(function(index, event) {
        var $event = $(event);
        var title = $event.title.text();
        var description = $event.description.html();
        var start = $event.start_time.text();

        var eventDiv = $("<div>");
          for (i = 0; i < 25; i++) {
            var eventTitle = $("<span>").text(title);
            $(eventDiv).append(eventTitle);
            var eventDescription = $("<span>").text(description);
            $(eventDiv).append(eventDescription);
            var eventStart = $("<span>").text(start);
            $(eventDiv).append(eventStart);
          }
          $("#free").html(eventDiv);
          
          
        
      })
    });
  }
  
  





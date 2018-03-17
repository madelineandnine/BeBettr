$(document).ready(function() {
  $('#modal1').modal();
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

var database= firebase.database();

var firstName = "";
var lastName = "";
var email = "";
var zipCode = "";

$(".modal-close").on("click", function() {
  // Don't refresh the page!
  event.preventDefault();

  firstName = $("#first_name").val().trim();
  lastName = $("#last_name").val().trim();
  email = $("#email").val().trim();
  zipCode = $("#zipcode").val().trim();

  database.ref().push({
    firstName: firstName,
    lastName: lastName,
    email: email,
    zipCode: zipCode,
    
  });


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
    
    var eventsQueryURL = "http://api.eventful.com/rest/events/search?...&location=San+Diego&app_key=JJR9n4PwkWr8G2dp";

    $.ajax({
      url: eventsQueryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);

    });
}   

function getWeather() {
    
    var weatherQueryURL = "api.openweathermap.org/data/2.5/weather?zip="+zipCode+",us&appid=949dca9cddf77db7c038faccb85305aa";

    $.ajax({
      url: weatherQueryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);

    });
}   

$(document).on("click","button", function () {
    var freeDiv=$("<div id=free-div>")
    var moderateDiv=$("<div id=moderate-div>")
    var priceyDiv=$("<div id=pricey-div>")

    for (i = 0; i < 10; i++) {
        var freeEvent= $("<img>").attr("class", "cartoon-img").attr("src", response.data[i]["images"]["original_still"].url).attr("data-still", response.data[i]["images"]["original_still"].url).attr("data-animate", response.data[i]["images"]["original"].url).attr("data-state", "still");
        $(cartoonDiv).append(cartoonImg);
      }

});



});
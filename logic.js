$(document).ready(function () {
  $('#modal1').modal();
  $('#modal2').modal();
  $('.dropdown-trigger').dropdown();
  $('footer').hide();
  $('header').hide();
  $('main').hide();

});






$('.add-event').on('click', function () {
  var modal2content = $('#modal2content').addClass('collection-item');




  $('#events').append(modal2content);

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


var firstName
var lastName
var email
var zipCode
var checkUsername
var checkPassword
var password
var passwordConfrim

$(".modal-close").on("click", function () {
  event.preventDefault();

  zipCode = $("#zipcode").val().trim();
  checkUsername = $("#login-username").val().trim();
  checkPassword = $("#login-password").val().trim();
  console.log(checkUsername)
  console.log(checkPassword)
  

  if (checkUsername == "") {
    alert("Please enter a username")
  } else {
    database.ref('users').child(checkUsername).once("value").then(function (snapshot) {
      if (snapshot.exists() && (checkPassword == snapshot.val().password)) {
        console.log("ok")
        $("#start-button").hide();
        $('header').show();
        $('footer').show();
        $('main').show()
        $("#logo").hide();
        getWeather();
        getEvents();
        
      } else {
        alert("incorrect username or password. Please try again.")
      }
    })
  }

});

$("#reg-button").on("click", function () {

  // Don't refresh the page!
  event.preventDefault();

  username = $("#username").val().trim();
  firstName = $("#first_name").val().trim();
  lastName = $("#last_name").val().trim();
  email = $("#email").val().trim();
  password = $("#reg-password").val().trim();
  passwordConfirm = $("#reg-password-confirm").val().trim();

  if (password == passwordConfirm) {
    database.ref().child("users").child(username).set({ email: email, password: password, name: firstName + " " + lastName, dateAdded: firebase.database.ServerValue.TIMESTAMP, })
    database.ref("users").child(username).once("value").then(function (snapshot) {
      console.log(snapshot.val().username)


    });


    alert("Registration complete! Please login to play!");
  } else {
    alert("Passwords do not match. Please try again");
  }

  
});




function getWeather() {

  var weatherQueryURL = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + ",us&units=imperial&appid=949dca9cddf77db7c038faccb85305aa";
  console.log(weatherQueryURL);

  $.ajax({
    url: weatherQueryURL,
    method: "GET"
  }).then(function (response) {

    console.log(response);
    var todayWeatherdesc = response.weather[0].main;
    var todayWeathertemp = response.main.temp;
    var todayWeatherwind = response.wind.speed;

    console.log(todayWeatherdesc, todayWeathertemp, todayWeatherwind)

    $(".weather-temp").text("Temp (f): " + todayWeathertemp + '\xB0');

    $(".weather-desc").text("Description: " + todayWeatherdesc);

    $(".weather-wind").text("Wind: " + todayWeatherwind);


    if (todayWeathertemp < 40) {
      $(".nav-wrapper").css("background", "#1CA79A");
    }
    else {
      $(".nav-wrapper").css("background", "#FFC719");
      $(".page-footer").css("background", "#FFC719");

    }


  });
}





function getEvents() {
  var zip = $("#zipcode").val();
  var eventsQueryURL = "https://api.eventful.com/json/events/search?q=" + zip + "&within=25&units=miles&date=Future&app_key=JJR9n4PwkWr8G2dp";

  $.ajax({
    url: eventsQueryURL,
    method: "GET",
    // dataType: 'JSON'
  }).then(function (response) {
    console.log(JSON.parse(response))
    var newResponse = JSON.parse(response);

    for (i = 0; i < newResponse.events.event.length; i++) {
      console.log(newResponse.events.event[i].id)

      var id = newResponse.events.event[i].id;
      var eventsQueryURL = "https://api.eventful.com/json/events/get?id=" + id + "&app_key=JJR9n4PwkWr8G2dp";

      $.ajax({
        url: eventsQueryURL,
        method: "GET",
        dataType: 'JSON'
      }).then(function (response) {
        console.log(response)

      });
      var eventDiv = $("<div>").addClass('event-item')

      var eventTitle = $("<span>").text(newResponse.events.event[i].title).addClass('event-title').append('</br>');
      eventDiv.append(eventTitle);
      var eventDescription = $("<span>").html(newResponse.events.event[i].description).addClass('event-description');
      eventDiv.append(eventDescription);
      console.log(newResponse.events.event[i].description);

      var eventButton = $("<button>").addClass('waves-effect waves-light btn-small').text("View Event")
      eventButton.attr("data-target=modal2")
      eventButton.attr("class=btn-hidden modal-trigger")
      eventButton.attr("data-event-id", i)
      eventButton.on("click", function () {
        $('#modal2').modal('open')
        var id = $(this).attr("data-event-id")
        $("#modal-event-title").text(newResponse.events.event[id].title)
        // $("#modal-event-image").attr("src", newResponse.events.event[id].image)
        $("#modal-event-description").html(newResponse.events.event[id].description)
        $("#modal-event-address").text(newResponse.events.event[id].address)
        console.log(newResponse.events.event[id].address)

      })
      eventDiv.append(eventButton);


      $("#event-div").append(eventDiv);

    }

  });

}





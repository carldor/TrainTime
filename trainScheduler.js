$(document).ready(function (){
var config = {
    apiKey: "AIzaSyBM8jKQY0uDFqujXIbDAr8NvbdR0zl8FL0",
    authDomain: "trainscheduler-92e64.firebaseapp.com",
    databaseURL: "https://trainscheduler-92e64.firebaseio.com",
    projectId: "trainscheduler-92e64",
    storageBucket: "",
    messagingSenderId: "1086515299812"
  };

firebase.initializeApp(config);

var database = firebase.database();

$("#add-time-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainTime = new moment($("#time-input").val().trim(),'HH:mm')._i;
  var trainFrequency = $("#frequency-input").val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency
  };

  database.ref().push(newTrain);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  // console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;


  prettyTrainTime = moment(trainTime,'HH:mm');

  var totalMinute = moment(moment()).diff(prettyTrainTime,'minutes');
  var minutesAway = trainFrequency - (totalMinute % trainFrequency);
  var nextArrival = moment(moment()).add(minutesAway, 'minutes').format('HH:mm'); 

  console.log(minutesAway);
  console.log(nextArrival);
  // currentTime = String(moment().format('HH:mm')_i)
  // var t = trainTime.split(':');
  // var t2 = currentTime.split(':');

  // var totalMinutes = (parseInt(Math.abs(t[0]) - t2[0]) * 60) + (Math.abs(parseInt(t[1]-t2[0]));

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});

});
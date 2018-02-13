/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase




// Initialize Firebase
var config = {
    apiKey: "AIzaSyCSWZ2B5cfg4ArZgxtF_ehy885v-SjjXH4",
    authDomain: "trainapp-2eee0.firebaseapp.com",
    databaseURL: "https://trainapp-2eee0.firebaseio.com",
    projectId: "trainapp-2eee0",
    storageBucket: "trainapp-2eee0.appspot.com",
    messagingSenderId: "868008518173"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#formSubmit").on("click", function(event) {
    event.preventDefault();

    // Grabs user input on form
    var trainName = $("#trainNameForm").val().trim();
    var trainDestination = $("#trainDestinationForm").val().trim();
    var trainFirst = $("#trainFirstForm").val().trim();
    var trainFrequency = $("#trainFrequencyForm").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        tName: trainName,
        tDest: trainDestination,
        tFirst: trainFirst,
        tFreq: trainFrequency
    };



    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.tName);
    console.log(newTrain.tDest);
    console.log(newTrain.tFirst);
    console.log(newTrain.tFreq);

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#trainNameForm").val("");
    $("#trainDestinationForm").val("");
    $("#trainFirstForm").val("");
    $("#trainFrequencyForm").val("");

});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().tName;
    var trainDestination = childSnapshot.val().tDest;
    var trainFirst = childSnapshot.val().tFirst;
    var trainFrequency = childSnapshot.val().tFreq;

    // Train Info
    // console.log(trainName);
    // console.log(trainDestination);
    console.log("this is 1st train" + trainFirst);
    console.log(trainFrequency);

    // Prettify the train start
    // var trainPretty = moment.unix(trainFirst).format("MM/DD/YY");

    // Calculate 
    // Assumptions
    var tFrequency = trainFrequency;

    // Time is 3:30 AM
    var firstTime = trainFirst;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trainFirst, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    console.log(firstTimeConverted + "1st time");

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var minAway = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minAway);

    // Next Train
    var nextTrain = moment().add(minAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var nextTrainPretty = moment(nextTrain).format("hh:mm");

    // var trainMonths = moment().diff(moment.unix(trainFirst, "X"), "months");
    // console.log(trainMonths);

    // Calculate the minutes away of the next train
    // var minAway = trainFirst - trainFrequency;
    // console.log(minAway);

    // Add each train's data into the table

    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
        trainFrequency + "</td><td>" + nextTrainPretty + "</td><td>" + minAway + "</td></tr>");
});
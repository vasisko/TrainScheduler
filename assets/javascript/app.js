
  // Initialize Firebase-------------------------------------
  var config = {
    apiKey: "AIzaSyDroP4vTn8JjE9ADrRc3KyU5i5jx4QOSGE",
    authDomain: "trainschedulercv.firebaseapp.com",
    databaseURL: "https://trainschedulercv.firebaseio.com",
    projectId: "trainschedulercv",
    storageBucket: "trainschedulercv.appspot.com",
    messagingSenderId: "644698320879"
  };
  firebase.initializeApp(config);
  //----------------------------------------------------------
  var database = firebase.database();


  // event-listener:  get user data
  $('#addTrain').on('click', function(){

    // Prevent the page from reloading
    event.preventDefault();

    // Get user data from form
    var name = $('#train-Name').val().trim();
    var dest = $('#train-Dest').val().trim();
    var first = $('#train-FirstTime').val().trim();
    var freq = $('#train-Freq').val().trim();

    console.log (name, dest, first, freq);

    if (name != "" && dest != "" && first != "" && freq != ""){        database.ref().push({  //push values to database using key 
        trainName: name,
        trainDest: dest,
        trainFirstTime: first,
        trainFreq: freq
      });
      // clear form fields from screen
      $("form")[0].reset();
    }
  });

  // listen for database post - when it occurs take snapshot of new data posted and add data to html db.ref().on("child_added", function (snapshot) {        		
  database.ref().on("child_added", function(childSnapshot){

    // be certain there is a child(new train) with data
    if (childSnapshot.val()) {

      // call child data = data......this is new train data from database
      var data = childSnapshot.val();
    
      // generate parts of new train data ....table elements
       console.log(childSnapshot.val());
    var newTrTrain = $('<tr>');
    var newTdName = $('<td>').text(data.trainName);
    var newTdDest = $('<td>').text(data.trainDest);
    var newTdFirst = $('<td>').text(data.trainFirstTime);
    var newTdMinToArr = $('<td>').text('TBD');
    var newTdFreq = $('<td>').text(data.trainFreq);
    var newTdNext = $('<td>').text('TBD');

    // add table cells(<td> tags) to table row (<tr> tab)
    newTrTrain.append(newTdName, newTdDest, newTdFirst, newTdMinToArr, newTdFreq, newTdNext);
    
    // now Write html to page appending it to tbody tag
    $('tbody').append(newTrTrain);

    }

    });
const messenger = require('./fcm.js');
const classFinder = require('./findclass.js');

var testPush = () => {
  var rand = Math.floor(Math.random() * 50);
  console.log("Rand: " + rand)

  messenger.sendMessageToUser('This is a test message ' + rand);
}

var classOpening = () => {
  classFinder.testforopening('CS 3410-001');
}

// testPush();

classOpening();

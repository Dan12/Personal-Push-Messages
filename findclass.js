const https = require('https');
const messenger = require('./fcm.js');
const log = require('./log');
const envVars = require('./envVar');

var cookie = envVars.cookie;
cookie = cookie.trim();

var endTable = "</td>";
var numEndTable = 5;
var imgSrc = '<img src="';
var openImg = "/cs/cuselfservice/cache/PS_CS_STATUS_OPEN_ICN_1.gif";

// time in minutes between checks
var minsBetweenChecks = 1;
// the request interval
var reqInterval;

var sendPush = (msg) => {
  log.log(msg);
  console.log(msg);
  messenger.sendMessageToUser(msg);

  clearInterval(reqInterval);
}

var processOutput = (data, lookfor) => {
  var index = data.indexOf(lookfor);

  if(index > 0) {
    for(var i = 0; i < numEndTable; i++) {
      index = data.indexOf(endTable, index+endTable.length)
    }
    index = data.indexOf(imgSrc, index) + imgSrc.length;
    var endQuote = data.indexOf('"', index);
    if(data.substring(index, endQuote) === openImg) {
      sendPush(lookfor + ' alert: Class is open');
    } else {
      console.log('class is closed');
    }
  } else {
    sendPush(lookfor + ' not found. May need to update the token.');
  }
}

var sendRequest = (name) => {
  // An object of options to indicate where to post to
  var options = {
      host: 'css.adminapps.cornell.edu',
      path: '/psc/cuselfservice/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL',
      method: 'GET',
      headers: {
        "Cookie": cookie
      }
  };

  var req = https.request(options, function(res) {

    res.setEncoding('utf8');

    if (res.statusCode >= 400) {
      sendPush('HTTP Error: '+res.statusCode+' - '+res.statusMessage+'\n');
    }
    else {
      // console.log('Success');
    }

    res.body = '';
    res.setEncoding('utf-8');

    // concat chunks
    res.on('data', function(chunk){ res.body += chunk });

    // when the response has finished
    res.on('end', function(){
        processOutput(res.body, name);
    });
  }).on('error', (e) => {
    sendPush(e);
  });

  req.end();
}

exports.testforopening = (name) => {
  sendRequest(name);

  reqInterval = setInterval(() => {
    sendRequest(name);
  }, minsBetweenChecks*60*1000);
}

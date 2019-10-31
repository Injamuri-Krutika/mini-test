/* eslint-disable require-jsdoc */
'use strict';
var config_JSON;
if (!config_JSON) {
  loadJSON(function (response) {
    config_JSON = JSON.parse(response);
  });
}

function validate() {
  var questionsList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  var allchecked = true;
  // for (var k = 0; k < questionsList.length; k++) {
  //   var ele = document.getElementsByName(questionsList[k]);
  //   var checked = false;
  //   for (var i = 0; i < ele.length; i++) {
  //     if (ele[i].checked) {
  //       checked = true;
  //       break;
  //     }
  //   }
  //   if (!checked) {
  //     console.log("disabled");
  //     document.getElementById('uploadAnswers').disabled = true;
  //     allchecked = false;
  //     break;
  //   }

  // }

  if (allchecked && document.getElementById("roll").value != "") {
    console.log("enabled");
    document.getElementById('uploadAnswers').disabled = false;
  } else {
    document.getElementById('uploadAnswers').disabled = true;
  }

}


function submitAnswers() {
  var submit_form = document.getElementById("questionAnswer");
  submit_form.action = "http://" + config_JSON.serverHostname + ":" + config_JSON.serverPort + "/submitAnswers";
}


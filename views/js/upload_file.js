/* eslint-disable require-jsdoc */
'use strict';
var config_JSON;
if (!config_JSON) {
  loadJSON(function (response) {
    config_JSON = JSON.parse(response);
  });
}


function validate() {



  if (document.getElementById('roll') && document.getElementById('roll').value !== ''
    // && document.getElementById('set') && document.getElementById('set').value !== ''
    && document.getElementById('uploadFile') && document.getElementById('uploadFile').value !== '') {

    document.getElementById('uploadDetails').disabled = false;
    return;
  } else if (document.getElementById('uploadDetails')) {
    document.getElementById('uploadDetails').disabled = true;
  }
}
function validateFile() {
  const filename = document.getElementById('uploadBtn').files[0].name;
  const extension = filename.split('.').pop();
  if (extension === 'zip') { document.getElementById('uploadFile').value = filename; }
  validate();
};

function submitFile() {
  // submit_form.action = "http://localhost:8080/submit";
  console.log(config_JSON);
  var submit_form = document.getElementById("uploadForm");
  submit_form.action = "http://" + config_JSON.serverHostname + ":" + config_JSON.serverPort + "/submit";

  // loadJSON(function (response) {
  //   var config = JSON.parse(response);
  //   console.log("http://" + config.serverHostname + ":" + config.serverPort + "/submit");
  //   var submit_form = document.getElementById("uploadForm");
  //   submit_form.action = "http://localhost:8080/submit";
  //   // submit_form.action = "http://" + config.serverHostname + ":" + config.serverPort + "/submit";
  // });
}


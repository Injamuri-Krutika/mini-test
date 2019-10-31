/* eslint-disable consistent-return */
// server.js
// Server app to display the webpage

// init project
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const formidable = require('express-formidable');

//const taList = require('./constants.js');
require('dotenv').config();

const app = express();
const filePaths = {};
app.use(formidable());

// eslint-disable-next-line require-jsdoc
function getTA(_roll, exam) {
  // Function to get the correct TA
  let roll = _roll;
  const pattern = /19[Mm][Cc][mM][Tt][0-5][0-9]/;
  if (!roll.match(pattern)) return 'others';
  roll = +roll.substring(roll.length - 2);
  // eslint-disable-next-line no-restricted-syntax
  for (const key in taList.ta[exam]) {
    if (taList.ta[exam][key][0] <= roll && roll <= taList.ta[exam][key][1]) {
      console.log(key);
      return key;
    }
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.body);
    var dest = `./uploads/${req.body.exam}/`;

    if (process.env.MAX_SETS > 1) {
      dest += `${req.body.set}/`;
    }
    dest += `${req.body.roll}`;

    if (filePaths[req.body.roll]) {
      fs.removeSync(filePaths[req.body.roll]);
    }
    filePaths[req.body.roll] = dest;
    fs.mkdirsSync(dest);
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log(path.extname(file.originalname));
    if (path.extname(file.originalname) !== '.zip') {
      return cb(new Error('Only ZIPs are allowed. Please upload again.'));
    }
    return cb(null, true);
  },
});
app.post('/submit', upload.single('zip'), (request, response) => {
  // console.log(request.file);
  // console.log(request.body);

  const meta = {
    name: request.file.originalname,
    mime: request.file.mimetype,
  };
  console.log(process.env.HOST);
  return response.redirect(`http://${process.env.HOST}:${process.env.PORT}/#thankyou`);
});

// listen for requests :)
const listener = app.listen(process.env.FILE_PORT || 8080, () => {
  // eslint-disable-next-line no-console
  console.log(`Your app is listening on port ${listener.address().port}`);
});


app.post('/submitAnswers', (request, response) => {
  console.log(request.fields);

  let rawdata = fs.readFileSync(__dirname + '/answers.json');
  let answers = JSON.parse(rawdata);
  let dir = "DSP";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  let count = 0;
  let content = "No.\tAnswer\tCorrectAnswer\n";


  for (let i = 1; i <= Object.keys(request.fields).length - 1; i++) {
    console.log("--", request.fields[i]);
    content += i + ".\t" + request.fields[i] + "\t" + answers[i] + "\n";
    if (request.fields[i] === answers[i]) {
      count++;
    }
  }
  content += "Total Marks: " + count + "/10.";

  fs.writeFile(dir + "/" + request.fields.roll + ".txt", content, function (err, file) {
    if (err) throw err;
    console.log(request.fields.roll + ".txt saved");
  });

  console.log(answers);
});

function countProperties(obj) {
  return Object.keys(obj).length;
}
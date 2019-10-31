// server.js
// Server app to display the webpage

// init project
const express = require('express');

const app = express();

app.use(express.static('.'));
app.use(express.static('./html'));
app.use(express.static('./node_modules/material-design-icons/iconfont'));


app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/index.html`);
});
app.get('/thankyou', (request, response) => {
  response.sendFile(`${__dirname}/html/thankyou.html`);
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 80, () => {
  // eslint-disable-next-line no-console
  console.log(`Your app is listening on port ${listener.address().port}`);
});

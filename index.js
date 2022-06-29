const express = require('express');

const app = express();

const PORT = 9630;

const db = require('./config/mongoose');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes'));

app.listen(PORT, (err) => {
  if (err) console.error('something went wrong' + err);
  console.log('app is running on http://localhost:' + PORT);
});

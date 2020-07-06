const express = require('express');
const app = express();
const cors = require('cors');
const CSVToJSON = require('csvtojson');
var fs = require('fs');
const Production = require('./OgelProduction.json');
const Runtime = require('./OgelRuntime.json');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res, next) => {
  res.set('Content-Type', 'text/html');
  res.send(Buffer.from(`<h2>Welcome to json server</h2>`));
});

CSVToJSON().fromFile('Ogel.Production.csv')
  .then(users => {
    console.log(users);
    fs.writeFile('OgelProduction.json', JSON.stringify(users), function (err) {
      if (err) throw err;
    });
  }).catch(err => {
    console.log(err);
  });
CSVToJSON().fromFile('Ogel.Runtime.csv')
  .then(users => {
    console.log(users);
    fs.writeFile('OgelRuntime.json', JSON.stringify(users), function (err) {
      if (err) throw err;
    });
  }).catch(err => {
    console.log(err);
  });



app.get('/Production', (req, resp) => {
  resp.json(Production);
});
app.get('/Runtime', (req, resp) => {
  resp.json(Runtime);
});

app.listen(process.env.PORT || 3000,
  () => console.log("Server is running..."));
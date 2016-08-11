const express = require('express'),
  app = express(),
  api = require('./routes/api'),
  bodyParser = require('body-parser');

app.use(bodyParser.json())
  .use(bodyParser.urlencoded({extended:false}))
  .use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
  .use('/api/v1', api);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is listening.');
});

module.exports = app;

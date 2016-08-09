const express = require('express'),
  app = express(),
  api = require('./routes/api'),
  bodyParser = require('body-parser');

app.use(bodyParser.json())
  .use(bodyParser.urlencoded({extended:false}))
  .use('/api/v1', api);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is listening.');
});

module.exports = app;

var express    = require('express'),
    bodyParser = require('body-parser'),
    request    = require('request'),
    app        = express(),
    port       = 3000;
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTION');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/api', function(req, res) {
  var url = req.query.url;
  if (!url) return res.status(500).json({ error: 'invalid url'});
  request(url, function (_err, _res, _body) {
    if (!_err && _res.statusCode == 200) {
      res.jsonp(_body);
    } else {
      res.status(500).json({ error: 'an error occurred'});
    }
  });
});
app.listen(port);

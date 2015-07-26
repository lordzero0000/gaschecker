var express = require('express');
var unirest = require('unirest');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  unirest.get('https://reto-fiware-cp15.herokuapp.com/api/getData?apiVersion=1')
  .header('Accept', 'application/json')
  .end(function (response) {
    console.log(response.body);
    var data = response.body;
    if (data.error) {
      res.render('test', { error: "NO DATA" });
    }else {
      res.render('graphs', {  });
    }
  });
});

/* GET individual graphs page. */
router.get('/solo', function(req, res, next) {
  var lat = req.query['lat'];
  var lon = req.query['lon'];
  var sold = req.query['sold'];
  var real = req.query['real'];
  res.render('solo', { lat: lat, lon: lon, sold: sold, real: real });
});

module.exports = router;

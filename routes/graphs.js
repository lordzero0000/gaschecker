var express = require('express');
var unirest = require('unirest');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  unirest.get('https://reto-fiware-cp15.herokuapp.com/api/getData?apiVersion=1')
  .header('Accept', 'application/json')
  .end(function (response) {
    console.log(response.body.result);
    var data = response.body.result;
    for (var value in data) {
      if (data.hasOwnProperty(value)) {
        console.log(data[value]);
      }
    }
    var lats = data.lat.split(',');
    var lons = data.long.split(',');
    var lits = data.liters.split(',');
    var pris = data.price.split(',');
    var urls = [];
    for (var i = 0; i < pris.length; i++) {
      var l = parseFloat(lits[i]);
      var p = parseFloat(pris[i]);
      var lp = l + p;
      l = (l / lp) * 100;
      p = (p / lp) * 100;
      urls.push('?lat=' + lats[i] + '&lon=' + lons[i] + '&sold=' + p + '&real=' + l);
    }
    res.render('graphs', { title: "Success", data: urls });
  });
});

/* GET individual graphs page. */
router.get('/solo', function(req, res, next) {
  var lat = req.query['lat'];
  var lon = req.query['lon'];
  var sold = req.query['sold'];
  var real = req.query['real'];
  res.render('solo', { title: "Individual", lat: lat, lon: lon, sold: sold, real: real });
});

module.exports = router;

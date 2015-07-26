var express = require('express');
var unirest = require('unirest');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  var estimation = req.body.estimation;
  var lat = req.body.lat;
  var lon = req.body.lon;
  console.log("lat: " + lat + " lon: " + lon);
  unirest.post('https://reto-fiware-cp15.herokuapp.com/api/postUserData?apiVersion=1')
  .header('Accept', 'application/json')
  .send({ "price": estimation, "lat": lat, "long": lon })
  .end(function (response) {
    console.log(response.body);
    var data = response.body;
    if (data.error) {
      res.render('test', { error: "NO DATA" });
    }else {
      res.render('test', { estimation: estimation, lat: lat, lon: lon });
    }
  });
});

module.exports = router;

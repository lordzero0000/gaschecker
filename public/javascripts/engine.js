if(navigator.geolocation)
{
  navigator.geolocation.getCurrentPosition(onSuccessGeolocating,
    onErrorGeolocating,
    {
      enableHighAccuracy: true,
      maximumAge:         5000,
      timeout:            10000
    }
  );
}
else
{
    alert("geolocation not activated");
}

function onSuccessGeolocating(position)
{
  console.log("lat: " + position.coords.latitude + " lon: " +
  position.coords.longitude + " alt: " + position.coords.altitude);
  var lon = position.coords.longitude;
  var lat = position.coords.latitude;
  document.getElementById("lat").value = lat;
  document.getElementById("lon").value = lon;
}

function onErrorGeolocating()
{
  alert("cannot geolocate you");
}

const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiYXJlaG1hbiIsImEiOiJjazhhMDNibG0wMHd3M2tsN2RiaHUwemllIn0.Izolug3I74yT0yz0JyeItw&limit=1";
  request({ url, json: true }, (err, response, body) => {
    if (err) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find the geo coordinates!", undefined);
    } else {
      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      const location = body.features[0].place_name;
      callback(undefined, {
        longitude: longitude,
        latitude: latitude,
        location: location
      });
    }
  });
};

module.exports = geocode;

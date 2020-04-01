const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/e365466d542ba0715c32451e271ce5a5/" +
    latitude +
    "," +
    longitude +
    "?units=si";
  request({ url, json: true }, (err, response, body) => {
    if (err) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      const forecast =
        body.currently.summary +
        ".It is currently " +
        body.currently.temperature +
        " degrees out. There is a " +
        body.currently.precipProbability +
        "% chance of rain.";
      callback(undefined, forecast);
    }
  });
};

module.exports = forecast;

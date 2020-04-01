const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

// routes
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "ARH"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "ARH"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Test help message",
    name: "ARH"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided."
    });
  }

  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({ error: err });
    }
    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({ error: err });
      }
      res.send({
        location: location,
        forecast: forecastData,
        address: req.query.address
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not found.",
    name: "ARH"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "My 404 Page.",
    name: "ARH"
  });
});

// set listener
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

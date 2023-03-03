const express = require("express");
const { json } = require("express/lib/response");
const https = require("https");
const bodyParser = require("body-parser");
const { dirname } = require("path");
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
    const appId = "6a76babe81fbdd2f5407c655cbcf5581";
    const query = req.body.cityname;
    const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+ appId + "&units="+units+"";
    https.get(url, function (respose) {
        console.log(respose.statusCode);``
    
        respose.on("data", function (data) {
          const weatherData = JSON.parse(data);
          console.log(weatherData);
          const temp = weatherData.main.temp;
          const weatherDescription = weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
          const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png";
          res.write("<P>the weather is currently " + weatherDescription + "</P>");
          res.write("<h1>weather in "+query+" is" + temp + "degree celsias</h1>");
          res.write("<img src =" + imageURL + ">");
          res.send();
        });
      });
 
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

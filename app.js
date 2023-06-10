const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');

})    //app.get brackets

app.post('/', function (req, res) {

    const query = req.body.cityName;
    const appid = "826f2577ccb967aa6c713e8846c092ee";
    const units = "imperial"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + units;



    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherdata = JSON.parse(data)
            const temp = weatherdata.main.temp
            const desc = weatherdata.weather[0].description
            const icon = weatherdata.weather[0].icon
            const weatherImg = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees fahrenheit</h1>")
            res.write("<p>The weather is currently " + desc + ".</p>")
            res.write("<img src = " + weatherImg + ">")
            res.send()

        }) // response.on() brackets-  RESPONSE FROM EXTERNER SERVER'S API

    }) //https.get response- RESPONSE FROM OUR SERVER TO USER'S browser

}) // app.post (post request) Brackets


app.listen(3000, function () {
    console.log('Server running on port 3000');
})


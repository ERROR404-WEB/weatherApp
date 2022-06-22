const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended : true}));


app.get("/",(req, res ) => {
    res.sendFile(__dirname + "/index.html");
})


app.post("/",(req , res) => {
    const apiKey = "ec9b79c4c63c06534a519841060b102c";
    const city = req.body.city;
    const units ="metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units="+ units +"&appid="+apiKey;
    https.get(url, (response) => {
        response.on("data", (data) => {
            data = JSON.parse(data);
            console.log(data);
            res.write("<h1>Temperature of "+ city +": " + data.main.temp + " Celsius.</h1>" );
            res.write("<p>Weather is currently "+ data.weather[0].description + " .</p>");
            const imgURL = "http://openweathermap.org/img/wn/"+ data.weather[0].icon +"@2x.png ";
            res.write("<img src=" + imgURL +">");
            res.send();
        })
    })
})


app.listen(process.env.PORT|| 3000, () =>{
    console.log("Express server listening on port" );
  });
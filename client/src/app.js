import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import ejs from "ejs";
import React from 'react';
import https from "https";
import './App.css';

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/', (req, res) => {
    const city = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + process.env.API_KEY + "&units=metric";
    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            
            const temperature = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>The temperature in " + city +" is " + temperature + " degrees Celcius.</h1>");
            res.write("<h2>The weather description is : " + weatherDescription + "</h2>");
            res.write("<img src=" + imgURL + ">");
            res.send();
        });
    });
});

app.listen(port, () => {console.log('Server started at port', port);});
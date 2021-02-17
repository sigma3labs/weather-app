import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import ejs from "ejs";
import https from "https";

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
            const weather = JSON.parse(data);
            console.log(weather);
        });
    });
});

app.listen(port, () => {console.log('Server started at port', port);});
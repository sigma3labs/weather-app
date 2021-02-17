import express from 'express';
import bodyParser from 'body-parser';
import ejs from "ejs";

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {console.log('Server started at port', port);});
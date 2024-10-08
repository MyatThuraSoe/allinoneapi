const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const session = require('express-session');
const cors = require('cors');


const app = express();

dotenv.config({ path: '.env' })
const PORT = process.env.PORT || 8080;

// log requests
app.use(morgan('tiny'));
app.use(cors());




// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.json())

// set view engine
app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
// app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
// app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
// app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

app.use(session(
    {
        secret: "secret for the protfo web",
        expires: new Date(Date.now() + (900 * 1000)), // 15 mins
        resave: false,
        saveUninitialized: true
    }));
// load routers
app.use('/', require('./server/router'))

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });

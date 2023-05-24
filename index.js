const express = require('express'); 
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');
const jwtPassportStrategy = require('./config/passport_jwt');
const PORT = process.env.PORT || 5000; 
app.use(express.urlencoded()); //to parse form data


app.use('/', require('./routes/index')); 


//------------ DB Configuration ------------//
const db = require('./config/key').MongoURI;

//------------ Mongo Connection ------------//
mongoose.connect(db, { useNewUrlParser: true, 
    useUnifiedTopology: true, 
    retryWrites: true,
    w: "majority",})
.then(() => console.log("Successfully connected to MongoDB"))
.catch(err => console.log(err));

//server listens on port
app.listen(PORT, function (err) {
    if (err) {
        console.log('An error occured in running the server!');
    }
    console.log(`Server is up and running on PORT :: ${PORT}`);
});
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// set up express app
const app = express();

//connect to mongo db
mongoose.connect('mongodb://localhost/restaurantgo');
mongoose.Promise = global.Promise;

app.use(express.static("public"));

app.use(bodyParser.json());

app.use('/api', require("./routes/api"));

app.use(function(err, req, res, next){
    res.status(422).send({error: err.message})
});

// listen for requests
app.listen(process.env.port || 4000, function(){
    console.log("listening for req");
});
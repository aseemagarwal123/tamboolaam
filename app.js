const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoute');

const mongoDb = 'mongodb+srv://arzoogoyal87:parsepassword@mycluster.4rdpd.mongodb.net/spontom?retryWrites=true&w=majority'
mongoose.connect(mongoDb, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true})
    .then(()=>{
        console.log('CONNECTION OPEN');
    })
    .catch(err => {
        console.log("error");
        console.log(err);
    });

app.use(morgan('dev'));
app.use(bodyParser.json({}));

app.use(bodyParser.urlencoded({extended: false}));

app.use("/user", userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;
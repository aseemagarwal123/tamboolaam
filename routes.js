/* eslint-disable linebreak-style */
const router = require('express').Router();

const sampleRoute = require('./routes/sampleRoute');


router.use('/v1/sample', sampleRoute);


module.exports = router;

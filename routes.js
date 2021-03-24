/* eslint-disable linebreak-style */
const router = require('express').Router();

const sampleRoute = require('./routes/sampleRoute');
const userRoutes = require('./routes/userRoute');


router.use('/v1/sample', sampleRoute);
router.use('/v1/user', userRoutes);


module.exports = router;

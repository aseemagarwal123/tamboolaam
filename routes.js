/* eslint-disable linebreak-style */
const router = require('express').Router();

const sampleRoute = require('./routes/sampleRoute');
const userRoutes = require('./routes/userRoute');
const orderRoutes = require('./routes/orderRoute');

router.use('/v1/sample', sampleRoute);
router.use('/v1/user', userRoutes);
router.use('/v1/order', orderRoutes);


module.exports = router;

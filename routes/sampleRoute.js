const router = require('express').Router();
const {sampleGet} = require('../controllers/sampleController');
router.get('/',sampleGet);
module.exports = router;
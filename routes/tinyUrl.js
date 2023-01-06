
const express = require('express');
const router = express.Router();

const tinyUrlController = require('../controllers/tinyUrlController');
const {tinyUrlRequestValidation} = require('../middlewares/TinyUrlReqValidation');
const CatchAsync = require('../utils/CatchAsync');


router.post('/create', tinyUrlRequestValidation, CatchAsync(tinyUrlController.createTinyUrl));
router.get('/all', tinyUrlController.getAllClicksOfUser);
router.get('/cassandra/all', tinyUrlController.getAllClicksFromCassandra);


module.exports = router;
const express = require('express');
const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

const tinyUrlController = require('../controllers/tinyUrlController');

router.get("/home", (req, res) => {
  res.send("Welcome to TinyUrl API");
});
router.get('/:tinyUrl', tinyUrlController.getTinyUrl);


module.exports = router;

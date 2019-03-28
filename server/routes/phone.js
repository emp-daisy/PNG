const router = require('express').Router();
const { PhoneController } = require('../controller');

router.get('/', PhoneController.getNumbers);
// Query: ?sort=desc
router.get('/generate', PhoneController.generate);

module.exports = router;

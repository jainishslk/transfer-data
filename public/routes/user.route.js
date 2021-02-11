const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');

router.post('/create', user_controller.user_create);
router.post('/login', user_controller.userlogin);
router.get('/:id', user_controller.user_details);
router.put('/:id/update', user_controller.user_update);
router.delete('/:id/delete', user_controller.user_delete);
router.get('/', user_controller.getAllUsers);
module.exports = router;
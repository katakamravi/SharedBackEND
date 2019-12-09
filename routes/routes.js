const router = require('express').Router();
const usercontroller = require('../controllers/users');

router.post('/users/insert', usercontroller.usersinsert);
router.post('/login', usercontroller.login);

router.get('/allUsers', usercontroller.getUsers);

router.post('/fileUpload', usercontroller.fileUpload);


module.exports = router;

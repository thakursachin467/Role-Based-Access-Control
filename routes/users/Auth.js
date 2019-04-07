const express = require('express');
const router = express.Router();
const user= require('../../controllers/users/auth');


router
    .route('/login')
    .post(user.LoginUser);

router
    .route('/signup')
    .post(user.AddUser);


module.exports= router;
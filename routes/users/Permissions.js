const express = require('express');
const router = express.Router();
const permissions= require('../../controllers/users/Permissions');


//add permissions to the database
router
    .route('/add')
    .post(permissions.addPermission);



module.exports= router;
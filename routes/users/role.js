const express = require('express');
const router = express.Router();
const roles= require('../../controllers/users/Roles');


//add roles to the database
router
    .route('/add')
    .post(roles.addRole);

//edit roles to the database
router
    .route('/edit')
    .post(roles.editRole);



module.exports= router;
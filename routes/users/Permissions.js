const express = require('express');
const router = express.Router();
const permissions = require('../../controllers/users/Permissions');

/**
 * @swagger
 * /add:
 *    post:
 *       description: Adds a new permission to the database
 *       tags: 
 *          - "Permissions (A user needs to be superAdmin to access this route)"
 *       parameters:
 *         - name: Authorization
 *           in: header
 *           description: Bearer token of the logged in user. Authorization token.
 *           required: true
 *           type: string
 *         - name: body
 *           in: body
 *           description: Permission which needs to be added to database
 *           required: true
 *           type: object
 *           schema: 
 *              type: object
 *              properties:
 *                 permission: 
 *                     type: string
  *                     example: read
 */


//add permissions to the database
router
    .route('/add')
    .post(permissions.addPermission);



module.exports = router;
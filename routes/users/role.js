const express = require('express');
const router = express.Router();
const roles = require('../../controllers/users/Roles');


/**
 * @swagger
 * /role/add:
 *    post:
 *       description: Adds a new role to the database
 *       tags: 
 *          - "Roles ( Needs to have read access to access this api)"
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
 *                 name: 
 *                    type: string
  *                    example: admin
  *                 permission: 
 *                    type: string
  *                    example: read
 */

/**
* @swagger
* /role/edit:
*    post:
*       description: Edits an existing role in the database.Can be use to add new  permissions to a role.
*       tags: 
 *          - "Roles ( Needs to have read access to access this api)"
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
 *                 roleId: 
 *                      type: string
  *                      example: MongoId
  *                 permission: 
 *                     type: string
  *                     example: write
*/

/**
* @swagger
* /role/assignRole:
*    post:
*       description: This end point is use to assign am existing  role to an existing user
*       tags: 
 *          - "Roles ( Needs to have read access to access this api)"
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
 *                 author: 
 *                     type: string
 *                     example: authorMongoId
  *                 role: 
 *                     type: string
 *                     example: superadmin
*/

//add roles to the database
router
    .route('/add')
    .post(roles.addRole);

//edit roles to the database
router
    .route('/edit')
    .post(roles.editRole);

//edit roles to the database
router
    .route('/assignRole')
    .post(roles.assignRole);



module.exports = router;
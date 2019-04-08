const express = require('express');
const router = express.Router();
const user = require('../../controllers/users/auth');

/**
 * @swagger
 * /auth/login:
 *    post:
 *       description: This route allows a user to login
 *       tags:
 *         - "Auth"
 *       parameters:
 *         - name: body
 *           in: body
 *           description: Permission which needs to be added to database
 *           required: true
 *           type: object
 *           schema: 
 *              type: object
 *              properties:
 *                 email: 
 *                     type: string
  *                     example: example@example.com   
  *                 password: 
 *                     type: string
  *                     example: example     
 */

/**
 * @swagger
 * /auth/signup:
 *    post:
 *       description: This route allows a user to signup to the application
 *       tags: 
 *          - "Auth"
 *       parameters:
 *         - name: body
 *           in: body
 *           description: Permission which needs to be added to database
 *           required: true
 *           type: object
 *           schema: 
 *              type: object
 *              properties:
 *                 email: 
 *                     type: string
  *                     example: example@example.com   
  *                 password: 
 *                      type: string
  *                      example: example 
  *                 firstName: 
 *                     type: string
  *                     example: john 
  *                 lastName: 
 *                       type: string
  *                       example: doe 
  *                 rePassword: 
 *                       type: string
  *                       example: example 
  *                 phone: 
 *                       type: string
  *                       example: 123456789 
  *          
 */
router
    .route('/login')
    .post(user.LoginUser);

router
    .route('/signup')
    .post(user.AddUser);


module.exports = router;
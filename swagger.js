/**
 * @swagger
 * definitions:
 *     action_types:
 *         type: "object"
  *         properties:
 *           permission:
 *             type: "string"
 *             description: "What type of permission can exists in our database"
 *             enum:
 *             - "read"
 *             - "write"
 *             - "update"
 *             - "delete"
*/

/**
 * @swagger
*definitions:
*  role:
*    type: "object"
*    properties:
*      name:
*        type: "string"
*        description: "Name of the role being added to database"
*      assign_type:
*        type: "array"
*        description: "An array of permission allowed for this role. This will be unique id's of action_types from action_types                          schema"
*      id:
*        type: "integer"
*        description: "Unique  id for a sigle document"
*
*/

/**
 * @swagger
*definitions:
*  user:
*    type: "object"
*    properties:
  *     id:
  *       type: "integer"
  *       description: "Unique  id for a sigle document"
  *     email:
  *       type: "integer"
  *       description: "email of  the user"
  *     password:
  *       type: "integer"
  *       description: "Password of  the user"
  *     phone:
  *       type: "string"
  *       description: "Phone Number of  the user"
  *     role:
  *       type: "array"
  *       description: "Reference to the role assign to this user"
  *       default: "Standard"
  *     name:
  *       type: "object"
  *       description: "Name of the user"
  *       properties:
  *          firstName:
  *             type: "string"
  *          lastName:
  *             type: "string"
*
*/



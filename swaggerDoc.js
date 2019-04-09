const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('swagger-jsdoc');


const options = {
  swaggerDefinition: {
    swagger: "2.0",
    info: {
      title: "Role Base Access Control",
      version: '1.0.0',
      description: "Role Base Access Control"
    },
    basePath: '/api',
    host: "https://role-base-access-control.herokuapp.com"

  },
  apis: ['./routes/users/Auth.js', './routes/users/Permissions.js', './routes/users/role.js', './routes/dummyRoutes/allRoutes.js', './swagger.js']
}

const specs = swaggerDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, options))
}
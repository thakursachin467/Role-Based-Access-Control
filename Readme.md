## Steps to run the application  
  
- Install NodeJS  
  
- Clone or Download this Repository  
  
- Run npm install  
  
- Getting started with database The database user here is Mongoose which is a MongoDB object modeling tool designed to work in an asynchronous environment. You can get started with mongoose (https://mongoosejs.com/docs/) or you can read thisawesome article on getting started with Mongoose. Fill your databse url in the keys_dev.js file inside the config folder  
  
- Run start script with npm start-dev  
  
  
## Usage
Only the user with the superadmin permission will be able to access this route	

    const access_rules= require('./Permissions/access_rules');
    app.use('/api/permissions',access_rules.canAccessRole(['superadmin']),permissions);

canAccessRole is fully customizable and you  can also pass multiple roles  to it.

    const access_rules= require('./Permissions/access_rules');
    app.use('/api/permissions',access_rules.canAccessRole(['admin','standard']),permissions);

The above will allow the user with admin and standard permission to access the route.

You can also customize it such that user with certain level of access i.e read access or write access can access or restrict from certain paths.

    app.use('/api/role',access_rules.canAccessPermissions(['read']),role);

In the above example only the users who have read access will be able to access the above route. No other user can access this route.

The database model for this dummy api is ![Here](https://drive.google.com/file/d/1fXqR55judHWMiskVm6lwUXIJ03KdbRPG/view?usp=sharing)


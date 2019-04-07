const express= require('express');
const app = express();
const mongoose= require('mongoose');
const jwt= require('jsonwebtoken');
const bodyParser = require('body-parser');
const PORT= process.env.PORT || 5000;
const auth= require('./routes/users/Auth');
const permissions= require('./routes/users/Permissions');
const role= require('./routes/users/role');
const Sentry = require('@sentry/node');
const allRoutes= require('./routes/dummyRoutes/allRoutes');
const access_rules= require('./Permissions/access_rules');
let Keys;
if(process.env.ENVIRONMENT ==='PRODUCTION'){
    Keys= process.env
} else{
    Keys=  require('./Config/Credintials/keys');
}

//basic middleware to check weather the user is logged in or not
// if logged in attach the user id to request
 app.use((request,response,next)=>{
    const authHeader= request.get('Authorization');
    if(authHeader){
        const token= authHeader.split(' ')[1];
        const verification= jwt.verify(token,Keys.SecretOrKey);
        request.userId= verification.userId;
    }
    next()
});


//sentry for error capturing
Sentry.init({ dsn:Keys.Sentrydsn });

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.connect(Keys.dbUrl,{ useNewUrlParser: true })
    .then(()=>console.log(`connection to database success`))
    .catch(((err)=>{
        Sentry.captureException(err);
        console.log(`connection failed to database ${err}`)
    }));


app.get('/',(request,response,next)=>{
   response.send('Every one can access this route. To know all routes go to /api/allroutes');
});


app.use('/api/allroutes',allRoutes)

//only super admin will be able to define what permission can be set i.e read write etc
app.use('/api/permissions',access_rules.canAccessRole(['superadmin']),permissions);

//only user who has read access will be able to add or edit roles
app.use('/api/role',access_rules.canAccessPermissions(['read']),role);
app.use('/api/auth/',auth);




app.listen(PORT,()=>{
    console.log(`APPLICATION STARTED ON PORT ${PORT}`);
});
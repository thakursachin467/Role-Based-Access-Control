const express= require('express');
const app = express();
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const PORT= process.env.PORT || 5000;
const auth= require('./routes/users/Auth');
const Keys= require('./Config/Credintials/keys');
const Sentry = require('@sentry/node');
const access_rules= require('./Permissions/access_rules');


//basic middleware to check weather the user is logged in or not
// if logged in attach the user id to request
 app.use((request,response,next)=>{
     console.log('here first');
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

app.use('/api/auth/',access_rules.canAccessRole(['admin']),auth);




app.listen(PORT,()=>{
    console.log(`APPLICATION STARTED ON PORT ${PORT}`);
});
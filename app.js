const express= require('express');
const app = express();
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const PORT= process.env.PORT || 5000;
const auth= require('./routes/user/Auth');
const Keys= require('./Config/Credintials/keys');
const Sentry = require('@sentry/node');

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


mongoose.connect(`mongodb://admin:admin12@ds159880.mlab.com:59880/scapic`)
    .then(()=>console.log(`connection to database success`))
    .catch(((err)=>{
        Sentry.captureException(err);
        console.log(`connection failed to database ${err}`)
    }));

app.use('/api/auth/',auth);
app.use('/api/profile/',profile);
app.use('/api/categories/',category);



app.listen(PORT,()=>{
    console.log(`APPLICATION STARTED ON PORT ${PORT}`);
});
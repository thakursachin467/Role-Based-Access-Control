const express = require('express');
const router = express.Router();
const Permissions= require('../../Permissions/access_rules');

router.get('/',(request,response,next)=>{
   const text= `
    You can create your account with /api/auth/signup with body structure as {
	"email":"email",
	"password":"password",
	"rePassword":"password",
	"firstName":"name"
}
 a standard role will be automatically assign to you.
 You can login and get the token using /api/auth/login with given body structure
 {
	"email":"registered email",
	"password":"password"
}
take then token and put it as Authorization. Now you are ready to explore.


for testing purpose you can use this token 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1Y2E5YmI1YmViZjVkMzk5ZTY2M2UyMWIiLCJlbWFpbCI6InRoYWt1cnNhY2hpbjQ2MjdAZ21haWwuY29tIiwiaWF0IjoxNTU0NjQ5NDY0fQ.5HqoJK6-CWcNC0biwpJ56b427PD9fiP00wvv_3MbOcE'

this user has all 4 read,write, update ,delete permissions

Go to /api/allroutes/onlyAdmin. this route will only be accessable by admin
/api/allroutes/onlyStandard. this route will only be accessed by standard user.
/api/allroute/onlySuperUser. only accessed by superuser
/api/allroute/SuperUserAndStandard. anyone from superadmin or standard user can access this route.
/api/allroute/SuperUserAndAdmin. anyone from superadmin or admin user can access this route.
/api/allroute/readAndWrite. anyone from read or write permission user can access this route.
   `;
    response.send(text);
});


router.get('/onlyAdmin',Permissions.canAccessRole(['admin']),(request,response,next)=>{
    response.send('You are admin');
});

router.get('/onlyStandard',Permissions.canAccessRole(['standard']),(request,response,next)=>{
    response.send('You are standard user');
});

router.get('/onlySuperUser',Permissions.canAccessRole(['superadmin']),(request,response,next)=>{
    response.send('You are Super admin');
});

router.get('/SuperUserAndStandard',Permissions.canAccessRole(['superadmin','standard']),(request,response,next)=>{
    response.send('You are Super admin or standard user');
});

router.get('/SuperUserAndAdmin',Permissions.canAccessRole(['superadmin','admin']),(request,response,next)=>{
    response.send('You are Super admin or admin user');
});

router.get('/readAndWrite',Permissions.canAccessPermissions(['read','write']),(request,response,next)=>{
    response.send('You have read  or write permissions');
});

module.exports= router;
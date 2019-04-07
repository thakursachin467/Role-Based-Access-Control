const action_type= require('../../models/users/action_types');
const Sentry = require('@sentry/node');
const _ = require('lodash');


exports.addPermission=async (request,response,next)=>{
    const permission= _.get(request,'body.permission');
const permissionData= {
    permission:_.toUpper(permission)
};
   const action= await action_type.addAction(permissionData);
try{
    const responseData= {
        success: true,
        data: action,
        error:{}
    };
    response
        .status(200)
        .send(responseData);
}catch (err) {
    Sentry.captureException(err);
    const responseData= {
        success: false,
        data: [],
        error:{
            message:'Something went Wrong!'
        }
    };
    response
        .status(500)
        .send(responseData);
}
};
const Role= require('../../models/users/roles');
const action_type= require('../../models/users/action_types');
const Sentry = require('@sentry/node');
const _ = require('lodash');
let Keys;
if(process.env.ENVIRONMENT ==='PRODUCTION'){
    Keys= process.env
} else{
    Keys=  require('./Config/Credintials/keys');
}
//@ RECEIVES 2 PARAMS NAME OF ROLE AND ARRAY OF PERMISSIONS FOR THAT ROLE
exports.addRole=async (request,response,next)=>{
    const roleName= _.get(request,'body.name');
    let actionName= !_.isEmpty(_.get(request,'body.permission')) ? _.get(request,'body.permission'): Keys.defaultPermissions;
    if(!_.isArray(actionName)){
        actionName= _.remove(_.split(actionName,','));
    }
    actionName= actionName.map(action=>{
        return _.toUpper(action);
    });
    const filter ={
        permission:{$in:actionName}
    };
    const permissions= await action_type.getActions(filter);
    let permission=[];
    permission= permissions.map((permission)=>{
       return permission._id;
    });
    const roleData= {
        name:_.toUpper(roleName),
        action_type:permission
    };
    const action= await Role.addRole(roleData);
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


exports.editRole= async  (request,response,next)=>{
    const roleId= _.get(request,'body.roleId');
    let actionName= !_.isEmpty(_.get(request,'body.permission')) ? _.get(request,'body.permission'): Keys.defaultPermissions;
    const filter ={
        permission: _.toUpper(actionName)
    };
    const permissions= await action_type.getAction(filter);
    const  permission= permissions._id;
    console.log(permissions);
   const roleFilter={
       _id:roleId
   };
    const update= {
        $addToSet:{action_type:permission}
    };
    const options={
        new: true
    };
    const action= await Role.editRole(roleFilter,update,options);
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
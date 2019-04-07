const _ = require('lodash');
const User= require('../models/users/user');
const Action_type= require('../models/users/action_types');



//@ deny permission to access a route based on role
// @ here role will be an array of permissions which will be allowed to access this route
exports.canAccessRole=  (requireRole)=>{
    requireRole= requireRole.map(role=>{
       return _.toUpper(role);
    });
    return async  (request,response,next)=>{
            const userId= request.userId;
            //if the not logged in user tries to query the route
            if(!userId){
                    response
                        .status(401)
                        .send({
                            success:false,
                            body:[],
                            error:{
                                message:'You do not have permissions to access this Resource'
                            }
                        })
            }
            const populateQuery= {path:'role',select:'name'};
            //get all the roles for this user from database
            const filter= {
                _id:userId
            };
            const user = await User.getUser(filter,populateQuery);
            try{
                //retrieve all role as array
                const role= _.toArray(user.role);
                //check if the role matches
                const found= role.some(r=>{
                   return requireRole.includes(r.name);
                });
                if(!found){
                    response
                        .status(401)
                        .send({
                            success:false,
                            body:[],
                            error:{
                                message:'You do not have permissions to access this Resource'
                            }
                        })
                } else{
                    next()
                }
            }catch (err) {
                next(err)
            }
    };

};


//@ deny permission to access a route based on permissions
// @ here permissions will be an array of permissions which will be allowed to access this route
exports.canAccessPermissions= (requiredpermissions)=>{
    requiredpermissions= requiredpermissions.map(permission=>{
        return _.toUpper(permission);
    });
    return async (request,response,next)=>{
        const userId= request.userId;
        //if the not logged in user tries to query the route
        if(!userId){
            response
                .status(401)
                .send({
                    success:false,
                    body:[],
                    error:{
                        message:'You do not have permissions to access this Resource'
                    }
                })
        }
        const populateQuery= {path:'role',select:'action_type'};
        //get all the roles for this user from database
        const filter= {
            _id:userId
        };
        const user = await User.getUser(filter,populateQuery);
        try{
            const action_type=[];
            _.map(user.role,(role)=>{
                return _.map(role.action_type,action=>{
                    action_type.push(action);
                    return;
                });
            });
            //retrieve all role as array
            const permissionFilter= {
                _id:{$in:action_type}
            };
            const permissions= await Action_type.getActions(permissionFilter);
            //check if the permission matches
               const found= permissions.some(r=>{
                    return requiredpermissions.includes(r.permission);
                });

            if(!found){
                response
                    .status(401)
                    .send({
                        success:false,
                        body:[],
                        error:{
                            message:'You do not have permissions to access this Resource'
                        }
                    })
            } else{
                next()
            }
        }catch (err) {
            next(err)
        }
    };
};
const _ = require('lodash');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const Sentry= require('@sentry/node');
const LoginValidation= require('../../Utils/LoginValidation');
const SignupValidation = require('../../Utils/SignupValidation');
const User= require('../../models/users/user');
const Keys= require('../../Config/Credintials/Keys');
const roles= require('../../models/users/roles');
exports.LoginUser= async (request,response,next)=>{
    const user= {
        email: _.get(request,'body.email'),
        password: _.get(request,'body.password')
    };
    const Validation = LoginValidation(user);
    if(!Validation.isValid){
        return response
            .status(401)
            .send({
                success:false,
                message: Validation.errors
            })
    }
    const filter= {
        email: user.email
    };
    const userProfile= await User.getUser(filter);
    if(_.isEmpty(userProfile)){
        return response
            .status(401)
            .send({
                success: false,
                message:{
                    email:'Email does not exist'
                }
            })
    }
    const isPresent= await bcrypt.compare(user.password,userProfile.password);
    if(!isPresent){
        return response
            .status(401)
            .send({
                success: false,
                message:{
                    password: 'Password is incorrect.'
                }
            })
    }
    const token=await jwt.sign({userId:userProfile._id,email:userProfile.email},Keys.SecretOrKey);
    const body={
        _id:userProfile._id,
        email: userProfile.email,
        firstName: userProfile.name.firstName,
        lastName: userProfile.name.lastName,
        token:`Bearer ${token}`,
        phone: userProfile.phone
    };
    return response
        .status(200)
        .send({
            success: true,
            body,
            message:{
                message:'Login Successful'
            }
        })
};


exports.AddUser=async (request,response,next)=>{
    const user= {
        email: _.get(request,'body.email'),
        name:{
            firstName: _.get(request,'body.firstName'),
            lastName: _.get(request,'body.lastName')
        },
        password: _.get(request,'body.password'),
        rePassword: _.get(request,'body.rePassword'),
        phone: _.toString(_.get(request,'body.phone'))
    };
    const Validation=  SignupValidation(user);
    if(!Validation.isValid){
        return  response
            .status(400)
            .send({
                success:false,
                message: Validation.errors
            });
    }
    //to check weather we have already registered with the email with any of our signup methods
    const filter= {
                email: user.email,
    };
    const userFound= await User.getUser(filter);
    if(!_.isEmpty(userFound) ){
        return  response
            .status(400)
            .send({
                success: false,
                message:{
                    email: 'User already exists with this email'
                }
            });
    }
    delete user.rePassword;
    const   hashedPassword= await bcrypt.hash(user.password,12);
    user.password= hashedPassword;
    //STANDARD ROLE WILL BE ASSIGN TO USER WHEN EVER A NEW USER SIGNS IN TO THE APPLICATION
    const roleFilter= {
        name:Keys.defaultRole
    };
    const role= await  roles.getRole(roleFilter);
    user.role= role.id;   //assign the unique id of role here
    const saveUser= await User.addUser(user);
    try{
        const body= {
            firstName: saveUser.name.firstName,
            lastName:  saveUser.name.lastName,
            email: saveUser.email,
            role: saveUser.role,
            phone: saveUser.phone,
            _id: saveUser._id,
        };
        return  response
            .status(200)
            .send({
                status:true,
                body,
                message:{
                    message:'Successfully created profile'
                }
            })
    }catch (error) {
        Sentry.captureException(error);
        return  response
            .status(500)
            .send({
                success: false,
                message:error
            });
    }
};
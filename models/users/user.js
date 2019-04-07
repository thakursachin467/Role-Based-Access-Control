const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const _ = require('lodash');
const ObjectId= Schema.ObjectId;
const Sentry = require('@sentry/node');
const userProfile = new Schema({
    email:{
        type: String
    },
    name:{
        firstName:{
            type:String
        },
        lastName:{
            type: String
        }
    },
    password:{
        type: String
    },
    phone:{
        type: String
    },
    role: [{
        type: ObjectId,
        ref: 'roles'
    }],
}, {
    timestamps: { createdAt: 'created_on', updatedAt: 'modified_on' },
    autoIndex: false
});

const UserProfiles = mongoose.model('userProfiles', userProfile);


UserProfiles.getUser= async (filter,populateQuery={path:'role'})=>{
    const query= await UserProfiles.findOne(filter).populate(populateQuery).lean().exec();
    try{
        return query;
    }catch (error) {
        Sentry.captureException(error);
        return error;
    }

};

UserProfiles.getUsers=async ({filter={},limit,skip})=>{
    const query =await  UserProfiles.find(filter).lean().skip(skip).limit(limit).exec();
    try{
        return query;
    }catch (error) {
        Sentry.captureException(error);
        return error;
    }
};

UserProfiles.addUser=async (params)=>{
    const user= new UserProfiles(params);
    const result= await user.save();
    try{
        return result;
    }catch (error) {
        Sentry.captureException(error);
        return error;
    }

};


UserProfiles.editUser = async  (filter,update,options={})=>{
    const query =await UserProfiles.findOneAndUpdate(filter,{$set:update},options).lean().exec();
    try{
        if(!_.isUndefined(query)) {
            return query;
        }

    }catch (error) {
        Sentry.captureException(error);
        return error;
    }
};




module.exports= UserProfiles;
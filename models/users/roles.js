const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId= Schema.ObjectId;
const Sentry= require('@sentry/node');
const userRole = new Schema({
    name:{
        type:String, //eg. Admin, super Admin. etc
        required: true
    },
    action_type: [
            {
            type:ObjectId,  //relation between userRoles and action_types i.e role admin has relation with action_type read and write
            ref:'action_types'
        }
        ]

}, {
    timestamps: { createdAt: 'created_on', updatedAt: 'modified_on' },
    autoIndex: false
});

const userRoles = mongoose.model('roles', userRole);


exports.addRole= async (roleData)=>{
  const saveRole= new userRoles(roleData);
  const role= await  saveRole.save();
    try{
      return role;
    }catch (e) {
        Sentry.captureException(e);
        return e;
    }
};

exports.getRole=async (filter,populateQuery={path:'action_type'})=>{
    const role= await userRoles.findOne(filter).populate(populateQuery).lean().exec();
    try{
        return role;
    }catch(err){
        Sentry.captureException(err);
        return err;

    }
};


exports.editRole= async (filter,update,options={})=>{
    const role =await userRoles.findOneAndUpdate(filter,update,options).lean().exec();
    try{
        return role;
    }catch (e) {
        Sentry.captureException(e);
        return e;
    }
};
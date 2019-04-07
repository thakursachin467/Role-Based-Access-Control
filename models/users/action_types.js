const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Sentry= require('@sentry/node');

const action_type = new Schema({
    permission:{
        type: String,
        enum : ['READ','WRITE','DELETE','UPDATE'],  //only these 4 options can be saved in our database
        unique: true
    }
}, {
    timestamps: { createdAt: 'created_on', updatedAt: 'modified_on' },
    autoIndex: false
});

const action_types = mongoose.model('action_types', action_type);


exports.addAction= async (roleData)=>{
    console.log('action');
    const saveAction= new action_types(roleData);
    const action= await saveAction.save();
    try{
        return action;
    }catch (e) {
        Sentry.captureException(e);
        return e;
    }
};

exports.getActions=async (filter)=>{
    const action= await action_types.find(filter).lean().exec();
    try{
        return action;
    }catch(err){
        Sentry.captureException(err);
        return err;

    }
};

exports.getAction=async (filter)=>{
    const action= await action_types.findOne(filter).lean().exec();
    try{
        return action;
    }catch(err){
        Sentry.captureException(err);
        return err;

    }
};

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const action_types = new Schema({
    permission:{
        type: String,
        enum : ['READ','WRITE','DELETE','UPDATE'],  //only these 4 options can be saved in our database
        unique: true
    }
}, {
    timestamps: { createdAt: 'created_on', updatedAt: 'modified_on' },
    autoIndex: false
});

const action_types = mongoose.model('action_types', action_types);


module.exports= action_types;
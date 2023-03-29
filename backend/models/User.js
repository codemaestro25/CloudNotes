const mongoose = require('mongoose');
const {Schema} = mongoose;
//model for creating a schema in MongoDB in the cloudNotes database
const UserSchema = new Schema({
    name :{
        type: String,
        required: true
    },
    email:{
        type : String,
        required : true,
        unique: true

    },
    password: {
        type: String,
        required : true
    },
    date : {
        type : Date,
        default: Date.now
    }
});
const User = mongoose.model('user', UserSchema);

module.exports = User;


// User.createIndexes(); // this will create indexes used to check unique emails. Note that i have written () which means that the function should be called
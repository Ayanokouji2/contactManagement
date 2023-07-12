const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unqiue: true
    },
    password:{
        type: String,
        required: true
    } 
},{
    timestamps: true
});

const userModel = model("users",userSchema);

module.exports = userModel;
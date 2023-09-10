const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema= new Schema({
        fname: {type: String},
        lname: {type: String },
        email: {type: String , requiired:true},
        password: {type: String , requiired:true}
})

module.exports= mongoose.model("User",userSchema,"User")
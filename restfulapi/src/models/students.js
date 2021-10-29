const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    name : {
        type : String,
        require : true,
        minlength:3
    },
    email : {
        type : String,
        require: true,
        unique: [true, "Email id already present"]       
    },
    phone :{
        type:Number,
        min:10,
        
        unique:true,
        require:true
    },
    address:{
        type: String,
        required:true,
    }
})
module.exports = mongoose.model('Student',studentSchema)
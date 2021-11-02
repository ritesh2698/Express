const mongoose = require('mongoose')
const Schema = mongoose.Schema

const useSchema = new Schema({
    fname : {
        type : String,
        require : true,
       
    },
    lname : {
        type : String,
        require : true,
        
    },
    email : {
        type : String,
        require: true,
        unique: [true, "Email id already present"]       
    },
    password:{
        type:String,
        require:true
    },
    token: { 
        type: String
     }

})
module.exports = mongoose.model('User',useSchema)
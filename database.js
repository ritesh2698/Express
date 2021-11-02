const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/jwt-project',{
    
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("Connection is succesfull")
})
.catch((err)=>{
    console.log(err || "Connection failed")
})
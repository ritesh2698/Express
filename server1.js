const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.get('/api',(req,res)=>{
    res.json({
        text:"my api"
    })
})

app.post('/api/login',(req,res)=>{
    //auth
    const id = "Hello"
    const user = {id}
    const token = jwt.sign({user}, "my_secret_key")
    res.json({
        token:token
    })
})

app.get('/api/protected',ensureToken,(req,res)=>{
    jwt.verify(req.token,'my_secret_key',function(err,data){
        if(err){
            res.sendStatus(403)
        }
        else{
            res.json({
                text:"Protected Api",
                data:data
            })
        }
    })
    
})

function ensureToken(req, res, next){
    const bearerHeader = req.headers["authorization"]
    if(typeof bearerHeader !== 'undefined'){
        const bearer =bearerHeader.split(" ")
        const bearerToken = bearer[1]
        req.token = bearerToken;
        next()
    }else{
        res.sendStatus(403);
    }
}

app.listen(5000,()=>{
    console.log("App listen on port 5000")
})
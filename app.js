const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const Book = require('./books')

app.get('/',(req, res)=>{
    res.send('Hello Ritesh')
})

//Connect to database
const dbURL = 'mongodb+srv://ritesh:root@nodejs.w4kgb.mongodb.net/NodeJs?retryWrites=true&w=majority'
mongoose.connect(dbURL,{useNewUrlParser:true, useUnifiedTopology: true})
    .then((result)=>{
        app.listen(port)
    })
    .catch((err)=>{
        console.log(err)
    })

app.get('/add-book',(req,res)=>{
    // res.send("add books")
    const book = new Book({
        name : "React Js",
        author : "Ritesh",
        description : "This is web development books",
        price : 101,
    })
    book.save()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
})

app.get('/all-book',(req,res)=>{
    Book.find()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
})

app.get('/update-book',(req,res)=>{
    Book.findByIdAndUpdate('617a4fae3ea0f9b9bce55326',{
        name : "python",
        author : "amit",
        description : "This book is used for backend and front end",
        price:301
    })
        .then((result)=>{
            res.redirect('/all-book')
        })
        .catch((err)=>{
            console.log(err)
        })
})

app.get('/delete-book',(req,res)=>{
    Book.findByIdAndDelete('617a50354b52322f930c5493')
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
})

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const Book = require('./books')


app.use(express.json())



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

//create book
app.post('/add-book',(req,res)=>{
    console.log(req.body)
    const book = new Book(req.body)
     book.save()
        .then((book)=>{
            res.send(book)
        })
        .catch((err)=>{
            succes:false,
            console.log(err)
        })
        
})

//fetch by id
app.get('/all-book/:id',(req,res)=>{
    const id = req.params.id
    Book.findById({_id:id})
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    })
})

//fetch all book
app.get('/all-book',(req,res)=>{    
    const book = new Book(req.body);
    Book.find()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
})

  
//update
app.put('/update-book/:id',(req,res)=>{
    const id = req.params.id
    Book.updateOne({_id:id},req.body)
        .then((book)=>{
            res.send(book)
        })
        .catch((err)=>{
            console.log(err)
        })
})

//delete
app.delete('/delete-book/:id',(req,res)=>{
    const id = req.params.id
     Book.deleteOne({_id:id})
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
})

//delete all records
app.delete('/delete-book',(req,res)=>{
    Book.deleteMany()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            res.send(err)
        })
})

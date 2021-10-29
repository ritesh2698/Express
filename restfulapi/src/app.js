const express = require('express')
const app = express()
require('./db/conn')
const Student = require('./models/students')

app.use(express.json())

app.get('/',(req, res)=>{
    res.send('Welcome Ritesh')
})

//create
app.post('/students', (req, res) => {
    console.log(req.body)
    const user = new Student(req.body)
    user.save()
        .then((user)=>{
            res.status(201).send(user)
        })
        .catch((err)=>{
            console.log(err)
            res.status(400).send(err)
        })
  })

app.listen(5000,()=>{
    console.log('Request from 5000 Port')
})
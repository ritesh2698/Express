const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const Book = require('./books')
const User = require('./user')
require('./database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require("./middleware/auth");



app.use(express.json())

const validations1= ()=>{
    return (req, res, next)=>{
        if(Object.entries(req.body).length<1 || typeof req.body == undefined){
           return res.status(404).send("please enter required element")        
        }else{
           next()
        }
    }
} 

const validations=(req, res, next)=>{
    if(req.query.admin === "true"){
        next()
    }else{
        res.status(404).send("No such")
    }
}

app.get('/',(req, res)=>{
    res.send('Hello Ritesh')
})

//Connect to database
// const dbURL = 'mongodb+srv://ritesh:root@nodejs.w4kgb.mongodb.net/NodeJs?retryWrites=true&w=majority'
// mongoose.connect(dbURL,{useNewUrlParser:true, useUnifiedTopology: true})
//     .then((result)=>{
//         app.listen(port)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })

app.post("/register", async (req, res) => {

    try {
      const { fname, lname, email, password } = req.body;
  
      if (!(email && password && fname && lname)) {
        res.status(400).send("All input is required");
      }
  
      
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      
      encryptedPassword = await bcrypt.hash(password, 10);
  
      const user = await User.create({
        fname,
        lname,
        email: email.toLowerCase(), 
        password: encryptedPassword,
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        "my_secret_key",
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
  
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  });

  app.post('/login', async (req, res) => {

    try {
      const { email, password } = req.body;
  
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      const user = await User.findOne({ email });
      console.log(user)    

    if(user && (password == user.password)){
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        "my_secret_key",
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;
      res.status(200).json(user);

    }
    res.status(400).send("Invalid Credentials");
   

  } catch (err) {
      console.log(err);
    }

  });


//create book
app.post('/add-book',auth,(req,res, next)=>{
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
app.get('/all-book/:id',auth,(req,res)=>{
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
app.get('/all-book',auth,(req,res)=>{    
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
app.put('/update-book/:id',auth,(req,res)=>{
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
app.delete('/delete-book/:id',auth,(req,res)=>{
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
app.delete('/delete-book',auth,(req,res)=>{
    Book.deleteMany()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            res.send(err)
        })
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})

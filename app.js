const express = require("express");
const path= require("path");
const app=express();
const port=80;
const bodyparser=require("body-parser");

//mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance');

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const Contact = mongoose.model('Contact', contactSchema);



app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/',(req,res)=>{
    const params ={};
    res.status(200).render('home.pug',params);
})

app.get('/contact',(req,res)=>{
    const params ={};
    res.status(200).render('contact.pug',params);
})

app.post('/contact',(req,res)=>{
    var myData = new Contact (req.body);
    myData.save().then(()=>{
        res.send("This item is saved")
    }).catch(()=>{
        res.status(400).send("Item was not saved to teh database")
    });
    
})
 
app.listen(port,()=>{
    console.log(`The application started successfully at port ${port}`);
});
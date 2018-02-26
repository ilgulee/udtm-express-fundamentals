const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');

const app=express();

//Connect to mongoose, local db or mLab...
mongoose.connect('mongodb://localhost/practice-db')
.then(()=>{console.log('MongoDB Connected...')})
.catch(error=>{console.log(err)});

//Load model
require('./models/Idea');
const Idea=mongoose.model('ideas');

//Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//Index Route get, post, put, delete
app.get('/',(req,res)=>{ // '/' is equal to 'localhost:port/'
    const title='Welcome';
    res.render('index',{title:title});
});
//About Route
app.get('/about',(req,res)=>{
    res.render('about');
});

//Add Idea Form
app.get('/ideas/add',(req,res)=>{
    res.render('ideas/add');
});

const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server started on PORT ${PORT}`);
});
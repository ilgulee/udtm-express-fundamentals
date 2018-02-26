const express = require('express');
const exphbs  = require('express-handlebars');
const methodOveride=require('method-override');
const bodyParser = require('body-parser');
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

//Body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Method override middleware
app.use(methodOveride('_method'));

//Index Route get, post, put, delete
app.get('/',(req,res)=>{ // '/' is equal to 'localhost:port/'
    const title='Welcome';
    res.render('index',{title:title});
});
//About Route
app.get('/about',(req,res)=>{
    res.render('about');
});

//Idea Index Page
app.get('/ideas', (req, res) => {
    Idea.find({}).sort({date:'desc'}).then(ideas=>{
        res.render('ideas/index',{
            ideas:ideas
        });
    })
});

//Add Idea Form
app.get('/ideas/add',(req,res)=>{
    res.render('ideas/add');
});

//Edit Idea Form
app.get('/ideas/edit/:id',(req,res)=>{
    Idea.findOne({
        _id:req.params.id
    }).then(idea=>{
        res.render('ideas/edit',{
            idea:idea
        });
    });
});

//Process Form Data from Idea Form without using Express Validation
app.post('/ideas', (req, res) => {
    let errors=[];
    if(!req.body.title){
        errors.push({text:'Please add a title'});
    }
    if(!req.body.details){
        errors.push({text:'Please add some details'});
    }
    if(errors.length>0){
        res.render('ideas/add',{
            errors:errors,
            title:req.body.title,
            details:req.body.details
        });
    }else{
        const newUser={
            title:req.body.title,
            details:req.body.details
        };
        new Idea(newUser).save().then(idea=>{
             res.redirect('/ideas');
        })
    }
});

//Edit Form Process
app.put('/ideas/:id', (req, res) => {
    Idea.findOne({
        _id:req.params.id
    }).then(idea=>{
        idea.title=req.body.title;
        idea.details=req.body.details;
        idea.save().then(idea=>{
             res.redirect('/ideas');
        })
    });
});

//Delete Idea
app.delete('/ideas/:id', (req, res) => {
    Idea.remove({_id:req.params.id}).then(()=>{
         res.redirect('/ideas');
    })
});

const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server started on PORT ${PORT}`);
});
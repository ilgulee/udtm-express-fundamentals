const express = require('express');
const exphbs  = require('express-handlebars');

const app=express();

//Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//Index Route get, post, put, delete
app.get('/',(req,res)=>{ // '/' is equal to 'localhost:port/'
    res.render('index');
});

app.get('/about',(req,res)=>{
    res.render('about');
});

const PORT=5000;

app.listen(PORT,()=>{
    console.log(`Server started on PORT ${PORT}`);
});
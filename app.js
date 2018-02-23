const express = require('express');

const app=express();

//How middleware works
app.use((req,res,next)=>{
    //console.log(Date.now());
    req.name='Ilgu';
    next();
});



//Index Route get, post, put, delete
app.get('/',(req,res)=>{ // '/' is equal to 'localhost:port/'
    res.send(req.name);
});

app.get('/about',(req,res)=>{
    res.send('ABOUT');
});

const PORT=5000;

app.listen(PORT,()=>{
    console.log(`Server started on PORT ${PORT}`);
});
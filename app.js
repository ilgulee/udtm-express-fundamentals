const express = require('express');

const app=express();

//Index Route get, post, put, delete
app.get('/',(req,res)=>{ // '/' is equal to 'localhost:port/'
    res.send('INDEX');
});

app.get('/about',(req,res)=>{
    res.send('ABOUT');
});

const PORT=5000;

app.listen(PORT,()=>{
    console.log(`Server started on PORT ${PORT}`);
});
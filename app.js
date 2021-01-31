const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
mongoose.connect('mongodb://localhost/danceContact', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;

// Defining Schema
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    message: String
});

const ContactModel = mongoose.model('Contact', ContactSchema);

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views',path.join(__dirname, 'views'))

app.get('/', (req, res)=>{
    res.status(200).render('home.pug')
});

app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug')
});
app.post('/contact', (req, res)=>{
    const myData = new ContactModel(req.body);
    myData.save().then(() =>{
        res.send("This data has been saved.")
    }).catch(() => {
        res.status(400).send("Problem Occured!!")
    });
    // res.status(200).render('contact.pug')
});


app.listen(port, ()=>{
    console.log(`Running on http://127.0.0.1:${port} .`)
});
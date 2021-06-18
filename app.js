const express = require("express");
const path = require("path");

const app = express();
const port = 8000;
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost:27017/restraunt', {useNewUrlParser: true, useUnifiedTopology: true});
const contactSchema = new mongoose.Schema({
    name: String,
    number:String,
    email:String
  });
const Contact = mongoose.model('Contact', contactSchema);

app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine','pug');
app.set('views', path.join(__dirname , 'views'));

app.get('/', (req, res)=>{
   
    const params = {}
    res.status(200).render('index.pug', params);
});
app.post('/',(req,res)=>{
    var myData = new Contact(req.body);
       myData.save().then(()=>{
       res.send("This item has been saved to the database")
       }).catch(()=>{
       res.status(400).send("item was not saved to the databse")
   })

});



app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

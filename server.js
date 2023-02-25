const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const MySnack = require('./models/snack');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
let connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongosetupcluster.li7admh.mongodb.net/ProductStore?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

//HOMEPAGE - Display all products in database
app.get('/get_snacks', async (req, res) => {
    //get snacks from MongoDB
    let response = await MySnack.find({});
    //display snacks in inventory to visitor
    res.json(response);
});

//SNACK PAGE - Display specific product in database on click
app.get('/get_specific_snack/:_id', async (req,res) => {
    //usually done from front end with req.body.whateverTheNameofIdasListedinGetRoute (also req.body.params.nameOfIdAsListedInGetRoute)
    // & get specific snack from MongoDB
    let id = req.params._id;
    let response = await MySnack.findById(id);
    res.json(response)
});

//SNACK PAGE/SEARCHBAR - search for snack from single snack page
app.get('/get_snack_by_name/:snackName', async (req, res) => {
    let response = await MySnack.find({snack: req.params.snackName})
    res.json(response)
})

//EDIT PAGE/CHOOSE - Display snack for choosing to edit (for edit page)
app.get('/edit/choose/', async (req, res) => {
    //get snacks from MongoDB
    let response = await MySnack.find({});
    //display snacks in inventory
    res.json(response);
});

//EDIT PAGE/ EDIT SNACK - Make changes to snack already in database
app.put('/edit/editSnack/:id', async (req,res) => {
    let response = await MySnack.findByIdAndUpdate(req.params.id, req.body, {new: true});
});

//CREATE PAGE - Submit new snack
app.post('/create', async (req,res) => {
    const {typeString: snack, snackPrice: price, snackPicture: image, snackQuantity: quantity} = req.body;
    //create snack to submit to database
    let response = await MySnack.create({
        snack,
        price,
        image,
        quantity,
    });
});

//ROUTES TO ACTIONS ON VARIOUS PAGES

//route to purchase snack
app.put('/buy_snack/:id', async (req,res) => {
    let response = await MySnack.findByIdAndUpdate(req.params.id, {quantity: req.body.buyOne}, {new: true});
    res.json(response);
});

//route to delete snack from store
app.delete('/delete_snack/:id', async (req,res) => {
    let id = req.params.id;
    let response = await MySnack.findOneAndDelete(id);
});

app.listen(5000, () => {
    console.log("Listening on port 5000")
});
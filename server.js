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

//Display all products in database
app.get('/get_snacks', async (req, res) => {
    //get snacks from MongoDB
    let response = await MySnack.find({});
    console.log("Displaying snacks");
    //display snacks in inventory to visitor
    res.json(response);
});

//Display specific product in database on click
app.get('/get_specific_snack/:_id', async (req,res) => {
    //usually done from front end with req.body.whateverTheNameofIdasListedinGetRoute (also req.body.params.nameOfIdAsListedInGetRoute)
    // & get specific snack from MongoDB
    let id = req.params._id;
    let response = await MySnack.findById(id);
    //show in DOM
    console.log("Displaying specific product");
    // send it back to front end
    res.json(response)
});

//Create a new snack in database
app.post('/create', async (req,res) => {
    console.log("Creating snack");
    const {typeString: snack, snackPrice: price, snackPicture: image, snackQuantity: quantity} = req.body
    console.log(req.body);
    //create snack to submit to database
    let response = await MySnack.create({
        snack,
        price,
        image,
        quantity,
    });
    //reflect submission on front end
    res.send(response);
});

//Update/modify existing product in database
app.put('/edit/', async (req,res) => {
    let snack = req.query.id
    console.log("Updating product");

    console.log(req.body);

    let response = await MySnack.findByIdAndUpdate(snack, {snack: req.body.newSnackName}, {price: req.body.newSnackPrice}, {image: req.body.newSnackImage}, {quantity: req.body.newQuantity});
    console.log("response from collection", response);
    res.json(response);

});

app.put("/buy_snack/:_id", async (req,res) => {
    let snack = req.params._id;
    let newQuantity = snack.quantity -= 1;
    let purchaseSnack = await MySnack.findByIdAndUpdate(snack, {quantity: req.body.newQuantity});

    console.log(purchaseSnack);
    res.send("Purchased!")
});

app.delete("/delete_snack/:_id", async (req,res) => {
    let id = req.params._id;
    let deletedItem = await MySnack.findByIdAndDelete(id);

    console.log(deletedItem);

    res.send("deleted")
});

app.listen(5000, () => {
    console.log("Listening on port 5000")
});
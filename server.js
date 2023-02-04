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
    const {typeString: snack, snackPrice: price, snackPicture: image} = req.body
    console.log(req.body);
    //create snack to submit to database
    let response = await MySnack.create({
        snack,
        price,
        image
    });
    //reflect submission on front end
    res.send(response);
});

//Update/modify existing product in database
app.put('/edit', async (req,res) => {
    let snack = req.query.id
    console.log("Updating product");

    console.log(req.body);

    let response = await MySnack.findByIdAndUpdate(snack, {snack: req.body.newSnackName}, {price: req.body.newSnackPrice}, {image: req.body.newSnackImage}, {new: true});
    console.log("response from collection", response);
    res.json(response);

});

//Delete a product from database
app.delete('/delete_product', async (req,res) => {
    console.log("Deleting product");

    let response = await MySnack.findByIdAndDelete(req.body.id);

   console.log(response);

   res.send({data: `deleted ${response.$isDeleted} items.`});
});

app.listen(5000, () => {
    console.log("Listening on port 5000")
});
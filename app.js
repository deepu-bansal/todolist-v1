
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect("mongodb://0.0.0.0:27017/todolistdb");

const itemschema = new mongoose.Schema({
    name: String
});

const item_model = mongoose.model("item", itemschema);

const item1 = new item_model({
    name: "buy food"
});

const item2 = new item_model({
    name: "cook food"
});

const item3 = new item_model({
    name: "eat food"
});

const defaultitems = [item1, item2, item3];

let workitems = [];

app.get("/", async function (req, res) {
    const que = await item_model.find({});
    if (que == 0) {
        item_model.insertMany(defaultitems);
        res.redirect("/");
    } else {
        res.render("list", { day: "Today", itemss: que });
    }
});



app.get("/about", function (req, res) {
    res.render("about");
});

app.post("/", function (req, res) {
    let item = req.body.newitem;
   
        let vars = new item_model({
            name: item
        });

        vars.save();
        res.redirect("/");
    }
);

app.post("/delete",async function (req,res) {
   const checkeditem = req.body.checkbox;
   await item_model.findByIdAndDelete({_id:checkeditem});
   res.redirect("/");
});

app.listen(3000, function () {
    console.log("Server started on port 3000.");
});


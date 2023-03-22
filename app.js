
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



let items = ["Buy Food", "Cook Food", "Serve Food"];
let workitems = [];

app.get("/", function (req, res) {
    res.render("list", { day : date() , items : items });
});

app.get("/work",function(req,res){
       res.render("list",{day:"work list", items: workitems});
});

app.get("/about",function(req,res){
    res.render("about");
});

app.post("/",function(req,res){
    const item=req.body.newitem;
    if(req.body.list==="work list")
   { workitems.push(item);
   res.redirect("/work");}
   else
   {
    items.push(item);
    res.redirect("/");
   }
});


app.listen(3000, function () {
    console.log("Server started on port 3000.");
});


const express = require("express");
const nunjucks = require("nunjucks");
const recipes = require("./data");

const server = express();

server.use(express.static('public'));

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    noCache: true
});

server.get("/", function(req, res){
    return res.render("index", {items: recipes});
});

server.get("/about-us", function(req, res){
    return res.render("about-us");
});

server.get("/recipes", function(req,res){
    return res.render("recipes", {items: recipes});
});

server.get('/recipe/:index', function (req, res) {
    const index = req.params.index
    const item = recipes[index]
    if (!item) {
        res.status(404).render("not-found");
    }
    return res.render('recipe', { item })
});

server.use(function (req, res) {
    res.status(404).render("not-found");
});

server.listen(3000, function(){
    console.log("Server is running");
});
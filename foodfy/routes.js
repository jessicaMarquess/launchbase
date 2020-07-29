const express = require('express');
const routes = express.Router();
const recipes = require("./data");
const recipe = require("./controllers/recipe");

routes.get("/", function(req, res){
    return res.render("index", {items: recipes});
});
routes.get("/about-us", function(req, res){
    return res.render("about-us");
});
routes.get("/recipes", function(req,res){
    return res.render("recipes", {items: recipes});
});
routes.get('/recipe/:index', function (req, res) {
    const index = req.params.index
    const item = recipes[index]
    if (!item) {
        res.status(404).render("not-found");
    }
    return res.render('recipe', { item })
});
routes.get("./admin/recipe", recipe.index);
// routes.get("/admin/recipes/create", recipes.create);
// routes.get("/admin/recipes/:index", recipes.show);
// routes.get("/admin/recipes/:id/edit", recipes.edit);
// routes.post("/admin/recipes", recipes.post);
// routes.put("/admin/recipes", recipes.put);
// routes.delete("/admin/recipes", recipes.delete);
routes.use(function (req, res) {
    res.status(404).render("not-found");
});
module.exports = routes;
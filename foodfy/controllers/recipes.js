const fs = require ('fs');
const data = require ("../data/datadmin.json");


exports.index = (req, res)=>{


    return res.render("admin/recipes/index", {recipes: data.recipes});
}

exports.create = (req, res)=>{
    return res.render("admin/recipes/create");
}

exports.show = (req,res)=>{
    const {id} = req.params;

    const foundRecipe = data.recipes.find(function(recipe){
        return recipe.id == id;
    });
    if(!foundRecipe){
        return res.send("Recipe not found!");
    }

    const recipe = {
        ...foundRecipe
    }

    return res.render("./admin/recipes/show",{recipe});
}

exports.edit = (req,res)=>{
    const {id} = req.params;

    const foundRecipe = data.recipes.find(function(recipe){
        return recipe.id == id;
    });
    if(!foundRecipe){
        return res.send("Recipe not found!");
    }
    const recipe = {
        ...foundRecipe
    }
    return res.render("./admin/recipes/edit",{recipe});
}

exports.post = (req,res)=>{
    const keys = Object.keys(req.body);
    for(key of keys){
        if(req.body[key] == ""){
            res.send("Por favor Preencha todo os campos");
        }
    }

    let id = Number(data.recipes.length + 1);
    

    data.recipes.push({
        id,
        ...req.body
    });
    
    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
        if(err){
            return res.send("Write File Error!");
        }
        return res.redirect("/admin/recipes/index");
    });


}

exports.put = (req,res)=>{
    const {id} = req.body;
    let index = 0;

    const foundRecipe = data.recipes.find(function(recipe, foundIndex){
        if(id == recipe.id){
            index = foundIndex;
            return true;
        }
    });
    if(!foundRecipe){
        return res.send("Recipe not found");
    }

    const recipe = {
        ...foundRecipe,
        ...req.body,
        id : Number(req.body.id)
    }

    data.recipes[index] = recipe;

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
        if(err){
            return res.send("Write error!");
        }
        return res.redirect(`/admin/recipes/${id}`);
    });
}

exports.delete = (req,res)=>{
    const {id} = req.body;

    const filteredRecipes = data.recipes.filter(function(recipe){
        return recipe.id != id;
    });
    data.recipes = filteredRecipes;

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
        if(err){
            return res.send("Write erro!");
        }
        return res.redirect("/admin/recipes");
    });
}
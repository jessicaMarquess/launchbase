const fs = require('fs');
const data = require('./data.json');
const { Z_DATA_ERROR } = require('zlib');

//create
exports.post = function(req, res){
    const keys = Object.keys(req.body);

    for(key in keys){
        //req.body.key
        if(req.body[key] == "")
        return res.send("Please, fill all fields");
    }

    req.body.birth = Date.parse(req.body.birth);
    req.body.created_at = Date.now();

    data.instructors.push(req.body);

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
        if(err) return res.send("Write file error");

        return res.redirect("/instructors")
    })

    // return res.send(req.body);
}

//update


//delete

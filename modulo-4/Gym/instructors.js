const fs = require('fs');
const data = require('./data.json');

//create
exports.post = function(req, res){

    const keys = Object.keys(req.body);

    for(key in keys){
        //req.body.key
        if(req.body[key] == "")
        return res.send("Please, fill all fields");
    }

    let {avatar_url, birth, name, services, gender} = req.body;


    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.instructors.length + 1);

 

    data.instructors.push({
        avatar_url,
        birth,
        created_at,
        id,
        gender,
        services,
        name
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
        if(err) return res.send("Write file error");

        return res.redirect("/instructors")
    })

    // return res.send(req.body);
}

//update


//delete

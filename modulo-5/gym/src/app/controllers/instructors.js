
const { age, date } = require('../../lib/utils');
const Intl = require('intl');

module.exports = {
    index(req, res){
        return res.render('instructors/index');
    },
    create(req, res){
        return res.render("instructors/create");
    },
    post(req, res){
        const keys = Object.keys(req.body);

        for(key in keys){
            if(req.body[key] == "")
            return res.send("Please, fill all fields");
        }
        let {avatar_url, birth, name, services, gender} = req.body;
        return;
    },
    show(req, res){
        return;
    },
    edit(req, res){
        return;
    },
    put(req, res){
        const keys = Object.keys(req.body);

        for(key in keys){
            if(req.body[key] == "")
            return res.send("Please, fill all fields");
        }
        return;
    },
    delete(req, res){
        return;
    },
}


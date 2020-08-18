const { date, age, graduation } = require('../../lib/utils');
const Teacher = require('../../app/models/Teacher')
const Intl = require("intl");

module.exports = {
    index(req, res){
        let { filter, page, limit } = req.query;
        
        page = page || 1;
        limit = limit || 2;
        let offset = limit * (page - 1);

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(teachers){
                const pagination = {
                    total: Math.ceil(teachers[0].total / limit),
                    page
                };
                return res.render("teachers/index", {teachers, pagination, filter});
            },

        };
        Teacher.paginate(params);
    },
    create(req, res){
        return res.render("teachers/create");
    },
    post(req, res){
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Preencha todos os valores!");
        }
        Teacher.create(req.body, function(teacher){
            return res.redirect(`/teachers/${teacher.id}`);
        });
    },
    show(req, res){
        Teacher.find(req.params.id, function(teacher){
            if(!teacher) return res.send("Teacher not exist, please try again!");

            teacher.age = age(teacher.birth_date);
            teacher.subjects_taught = teacher.subjects_taught.split(",");
            teacher.education_level = graduation(teacher.education_level);

            teacher.created_at = date(teacher.created_at).format;

            return res.render("teachers/show", {teacher});
        });
    },
    edit(req, res){
        Teacher.find(req.params.id, function(teacher){
            if(!teacher) res.send("Teacher not exist, please try again");

            teacher.birth_date = date(teacher.birth_date).iso;

            return res.render("teachers/edit", {teacher});
        });
    },
    update(req, res){
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Preencha todos os valores!");
        }

        Teacher.update(req.body, function(){
            return res.redirect(`/teachers/${req.body.id}`);
        });
    },
    delete(req, res){
        Teacher.delete(req.body.id, function(){
            return res.redirect(`teachers`);
        });
    }
}
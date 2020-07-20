const fs = require('fs');
const data = require('./data.json');
const { graduation, age, date } = require('./utils');

exports.index = function(req, res) {
    const mrTeacher = []
    for (let teacherMr of data.teachers) {
        const teacher = {
            ...teacherMr,
            proceeding: teacherMr.proceeding.split(",")
        }
        mrTeacher.push(teacher);
    }
    return res.render('teachers/index', { teachers: mrTeacher });
}
exports.show = function(req,res){
    const {id} = req.params;

    const foundTeacher = data.teachers.find(function(teacher){
        return id == teacher.id;
    });
    
    if(!foundTeacher) return res.send("Teacher not found!");

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        edu_level: graduation(foundTeacher.edu_level),
        proceeding: foundTeacher.proceeding.split(","),
        created_at: (new Intl.DateTimeFormat('en-US').format(foundTeacher.created_at)),  
    }
    return res.render('teachers/show', {teacher});
};
exports.post = function(req,res){
    const keys = Object.keys(req.body);

    for (key of keys){
       if (req.body[key] == "")
          return res.send("Preencha todos os valores!"); 
    }

    let {avatar_url, name, birth, edu_level, tip, proceeding} = req.body;
    
    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.teachers.length + 1);

    data.teachers.push({
        id,
        avatar_url,
        name, 
        birth,
        edu_level,
        tip,
        proceeding,
        created_at
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err) return res.send("Write file error!");

        return res.redirect("/teachers");
    })
};
exports.edit = function(req, res){
    const {id} = req.params;

    const foundTeacher = data.teachers.find(function(teacher){
        return id == teacher.id;
    });
    
    if(!foundTeacher) return res.send("Teacher not found!");

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    return res.render('teachers/edit', {teacher});
};

exports.update = function(req,res){
    const {id} = req.body;
    let index = 0;

    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        if (id == teacher.id){
            index = foundIndex;
            return true;
        }
    });
    
    if(!foundTeacher) return res.send("Teacher not found!");

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    };

    data.teachers[index] = teacher;

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
        if(err) return res.send("Write error");

        return res.redirect (`/teachers/${id}`);
    })
};

exports.delete = function(req, res){
    const {id} = req.body;

    const filteredTeachers = data.teachers.filter(function(teacher){
        return teacher.id != id;
    });

    data.teachers = filteredTeachers;

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function(err){
        if (err) return res.send("write error");

        return res.redirect('/teachers');
    })
}

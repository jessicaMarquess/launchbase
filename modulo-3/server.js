const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const courses = require('./data');

server.use(express.static('public'))

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
});
server.get("/", function (req, res) {
    const about = {
        title: "Rocketseat",
        description: "As melhores tecnologias em programação, direto ao ponto e do jeito certo. No meio de tanta informação e da quantidade de ferramentas que surgem todos os dias, você precisa de alguém que te leve na direção certa.",
        skills: [
            { name: "NodeJS", url: "https://nodejs.org/en/" },
            { name: "ReactJS", url: "https://pt-br.reactjs.org/" },
            { name: "React Native", url: "https://reactnative.dev/" }
        ]
    }
    return res.render("about", { about });
});
server.get("/courses", function (req, res) {
    return res.render("courses", { items: courses });
});
server.get("/course/:id", function (req, res) {
    const id = req.params.id;

    const course = courses.find(function (course) {
        return course.id == id;
    })
    if (!course) {
        return res.status(404).render("not-found");
    }
    return res.render("course", { item: course });
});
server.use(function (req, res) {
    res.status(404).render("not-found");
});
server.listen(5000, function () {
    console.log("Server is running");
});
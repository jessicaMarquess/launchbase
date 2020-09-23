const User = require('../models/User');
const {hash} = require('bcryptjs');
const crypto = require('crypto');
const mailer = require('../../lib/mailer');

module.exports = {
    loginForm(req, res) {
        return res.render("session/login");
    },
    login(req, res) {
        req.session.userId = req.user.id;
        return res.redirect("/users");
    },
    logout(req, res) {
        req.session.destroy();
        return res.redirect("/");
    },
    forgotForm(req, res) {
        return res.render('session/forgot-password');
    },
    async forgot(req, res) {
        const user = req.user;
        try {
            const token = crypto.randomBytes(20).toString("hex");
            let now = new Date();
            now = now.setHours(now.getHours() + 1);
            await User.update(user.id, {
                reset_token: token,
                reset_token_expires: now
            });
            await mailer.sendMail({
                to: user.email,
                from: 'no-reply@launchstore.com.br',
                subject: 'Recuperação de Email',
                html: `<h2>Perdeu a chave?</h2>
            <p>Não se preocupe! Basta clicar no link abaixo para recuperar sua senha :)</p>
            <p>
                <a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">
                    Recuperar Senha
                </a>
            </p>
            `,
            });
            return res.render('session/forgot-password', {
                success: "Verifique seu email para resetar a sua senha!"
            });

        } catch (err) {
            console.log(err);
            res.render("session/forgot-password", {
                error: "Erro inesperado, tente novamente"
            });
        }
    },
    resetForm(req, res){
        return res.render("session/password-reset", {token: req.query.token});
    },
    async reset(req, res){
        const user = req.user;
        const {password, token} = req.body;
        try {
            const newPassword = await hash(password, 8);

            await User.update(user.id, {
                password: newPassword,
                reset_token: "",
                reset_token_expires: "",
            });
            //aviso o usuario que ele tem uma nova senha 
            return res.render('session/login',{
                user: req.body,
                success: "Senha alterada com sucesso, faça seu login"
            });
        } catch (err) {
            console.error(err);
            res.render("session/password-reset", {
                user: req.body,
                token,
                error: "Erro inesperado, tente novamente"
            });
        }
    }
};
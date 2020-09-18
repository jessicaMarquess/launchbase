const User = require('../models/User');
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
            //criar um expiração do token
            let now = new Date();
            now = now.setHours(now.getHours() + 1);

            await User.update(user.id, {
                reset_token: token,
                reset_token_expires: now
            });
            //enviar um email com um link de recuperacao de senha 
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
    reset(req, res){
        const {email, password, passwordRepeat, token} = req.body;
        try {
            //procurar usuario

            //ver se a senha bate

            //verificar se o token bate

            //verificar se o token não expirou

            //cria um novo hash de senha

            //atualiza o usuário 

            //aviso o usuario que ele tem uma nova senha 
            
        } catch (err) {
            console.error(err);
            res.render("session/password-reset", {
                error: "Erro inesperado, tente novamente"
            });
        }
    }
};
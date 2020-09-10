const User = require('../models/User');

async function post(req, res, next){
    const keys = Object.keys(req.body);

        for(key of keys){
            if(req.body[key] == ""){
                return res.render('user/register', {
                    user: req.body,
                    error: 'Por favor, preencha todos os campos'
                });
            };
        };
        //check if user exists [email, cpf_cnjp uniques]
        let {email, cpf_cnpj, password, passwordRepeat} = req.body;

        cpf_cnpj = cpf_cnpj.replace(/\D/g, "");

        const user = await User.findOne({
            where: { email },
            or: { cpf_cnpj }
        });

        if(user) return res.render('user/register', {
            user: req.body,
            error: 'Usuário já cadastrado'
        });
        //check if passwors match
        if(password != passwordRepeat) return res.render('user/register', {
            user: req.body,
            error: 'Os campos de senhas não estão idênticas'
        });
        next();
};
module.exports = {
    post
}
const User = require('../models/User');

async function post(req, res, next){
    const keys = Object.keys(req.body);

        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Please, fill all fields');
            };
        };
        //check if user exists [email, cpf_cnjp uniques]
        const {email, cpf_cnpj, password, passwordRepeat} = req.body;

        cpf_cnpj = cpf_cnpj.replace(/\D/g,"");

        const user = await User.findOne({
            where: {email},
            or: {cpf_cnpj}
        });

        if(user) return res.send('Users exists');
        //check if passwors match
        if(password != passwordRepeat)
            return res.send("Passwors Mismatch");
        
        next();
};
module.exports = {
    post
}
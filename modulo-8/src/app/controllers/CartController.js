const { removeOne } = require('../../lib/cart');
const Cart = require('../../lib/cart');

const LoadProductsService = require('../services/LoadProductService');
module.exports = { 
    async index(req, res) {
        try {  
            let { cart } = req.session;
            
            cart = Cart.init(cart)

            return res.render('cart/index', {cart});
        }
        catch(err) {
            console.error(err);
        };           
    },
    async addOne(req, res){
        try {
            const {id} = req.params;

            const product = await LoadProductsService.load('product', {where: {id}}); 

            let { cart } = req.session;

            req.session.cart = Cart.init(cart).addOne(product);

            return res.redirect('/cart');
            
        } catch (error) {
            console.error(error);
        };
    },
    removeOne(req, res){
            let { id } = req.params;

            let { cart } = req.session;

            if(!cart) return res.redirect('/cart');

            req.session.cart = Cart.init(cart).removeOne(id);

            return res.redirect('/cart');
    
    }
}
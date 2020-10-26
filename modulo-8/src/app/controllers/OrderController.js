const User = require('../models/User');
const Order = require('../models/Order');
const LoadProductService = require('../services/LoadProductService');

const Cart = require('../../lib/cart');
const mailer = require('../../lib/mailer');
const {formattedPrice, date} = require('../../lib/utils');




const email = (seller, product, buyer) => `
    <h2>Olá, ${seller.name}</h2>
    <p>Você tem um novo pedido de compra do seu produto</p>
    <p>Produto: ${product.name}</p>
    <p>Preço: ${product.formattedPrice}</p>
    <p><br/><br/></p>
    <h3>Dados do comprador</h3>
    <p>${buyer.name}</p>
    <p>${buyer.email}</p>
    <p>${buyer.address}</p>
    <p>${buyer.cep}</p>
    <p><br/><br/></p>
    <p><strong>Entre em contato com o comprador pra finalizar a venda!</strong></p>
    <p><br/><br/></p>
    <p>Atenciosamente, Equipe Launchstore</p>
`
module.exports = {
    async index(req, res){
        //pegar os pedidos do user
        let orders = await Order.findAll({where: {buyer_id:req.session.userId}});

        const getOrdersPromise = orders.map(async order => {
            //details of products
            order.product = await LoadProductService.load('products', {
                where: {id:order.product_id}
            });
            //details of buyer
            order.buyer = await User.findOne({
                where: {id:order.buyer_id}
            });
            //details of seller
            order.seller = await User.findOne({
                where:{id:order.seller_id}
            });
            //formatation of price
            order.formattedPrice = formattedPrice(order.price);
            order.formattedTotal = formattedPrice(order.total);
            //formatation of status
            const statuses = {
                open: 'Aberto',
                sold: 'Vendido',
                canceled: 'Cancelado'
            };
            order.formattedStatus = statuses[order.status];
            //formatation of atualization
            const updatedAt = date(order.updated_at);

            order.formattedUpdatedAt = `${order.formattedStatus} em ${updatedAt.day}/${updatedAt.month}/${updatedAt.year} às ${updatedAt.hour}h${updatedAt.minutes}`;

            return order;
        });
        orders = await Promise.all(getOrdersPromise);

        return res.render("orders/index", {orders});
    },
    async post(req, res) {
        try {

            //pegar os produtos do carrnho 
            const cart = Cart.init(req.session.cart);
            //saber se o produto eh do user logado
            const buyer_id = req.session.userId;

            const createOrderPromise = cart.items.filter(item =>
                item.product.user_id != buyer_id
            ).map( async item => {
                let { product, price:total , quantity } = item;
                const { price, id:product_id, user_id:seller_id } = product;
                const status = "open";

                const order = await Order.create({
                    seller_id,
                    buyer_id,
                    product_id,
                    price,
                    total,
                    quantity,
                    status
                });
                 //pegar dados do produto
                product = await LoadProductService.load('product', {
                    where: {
                        id: product_id,
                    },
                });
                //pegar dados do vendedor
                const seller = await User.findOne({ where: { id: seller_id } });
                //os dados do comprador
                const buyer = await User.findOne({ wher: { id: buyer_id } });
                //enviar email com dados da compra para o vendedor
                await mailer.sendMail({
                    to: seller.email,
                    from: 'no-replay@launchstore.com.br',
                    subject: 'Novo pedido de comprar',
                    html: email(seller, product, buyer)
                });
                return order
            });
            await Promise.all(createOrderPromise);

            //clean cart
            delete  req.session.cart;
            Cart.init();
            //notificar o usuário com alguma mensagem de sucesso
            return res.render('orders/success');
        }
        catch (err) {
            console.error(err);
            return res.render('orders/error');
        };
    },
};
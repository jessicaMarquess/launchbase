const Order = require('../models/Order');
const User = require('../models/User');
const LoadProductService = require('./LoadProductService');

const {formatPrice, date} = require('../../lib/utils');

async function format(order){
    //details of products
    order.product = await LoadProductService.load('product', {
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
    order.formattedPrice = formatPrice(order.price);
    order.formattedTotal = formatPrice(order.total);
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
};
const LoadServices = {
    load(service, filter){
        this.filter = filter;
        return this[service]();
    },
    async order(){
        try {
            const order = await Order.findOne(this.filter);

            return format(order);
        } catch (err) {
            console.error(err);
        }
    },
    async orders(){
        try {
            const orders = await Order.findAll(this.filter);
            const ordersPromise = orders.map(format);

            return Promise.all(ordersPromise);
        } catch (err) {
            console.error(err);
        }
    },
    format,
};

module.exports = LoadServices;
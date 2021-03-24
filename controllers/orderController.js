const {Order} = require('../models/order');

const placedOrder = async (req, res, next)=>{
    try{
        const order = await new Order(req.body);
        return res.status(200).send({
            'response': {
                'message': "order",
                'order': order
            }
        })
    } catch(ex){
        next(ex);
    }
}

const getAllOrders = async (req, res, next) => {
    try {
        const allOrders = await Order.find();
        console.log(allOrders);
        allOrders.forEach(order => {
            res.status(200).send({
                'response': {
                    'message': "allOrders",
                    'order': order
                }
            })
        })
    } catch(e){
        next(e);
    }
}

module.exports = {
    placedOrder,
    getAllOrders
}
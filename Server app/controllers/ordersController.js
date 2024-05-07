const OrdersModel = require('../models/orderModel');


async function generateNewIdOrder() {
    try {
        const maxIdOrder = await OrdersModel.findOne().sort({ idOrder: -1 }).select('idOrder').limit(1);

        let newIdOrder;
        if (maxIdOrder) {
            newIdOrder = maxIdOrder.idOrder + 1;
        } else {
            // If no documents are present, start with 1
            newIdOrder = 1;
        }

        return newIdOrder;
    } catch (error) {
        console.error('Error generating new idOrder:', error);
        throw error;
    }
}

const addOrder = async (req, res) => {
    const {items, idUser} = req.body;

    generateNewIdOrder()
    .then((newIdOrder) => {
        // Creating a new Order document
        const newOrder = new OrdersModel({
            idUser: idUser,
            items: items,
            idOrder: newIdOrder,
            dateCreated: new Date(),
            status: "pending"
        });
    
        // Saving the new document to the database
        newOrder.save().then(result => {
            res.status(200).send({"success": true,"msg": "New order added"});
        })
    })
}

const getAllOrders = async (req, res) => {
    const allOrders = await OrdersModel.find({status : "pending"});
    res.status(200).json({ allOrders: allOrders, nbHits: allOrders.length });
}

const acceptOrder = async (req, res) => {
    const {idOrder} = req.body;

    OrdersModel.updateOne({idOrder: idOrder}, {$set: {status: "accepted"}}).then(result => {
        res.status(200).send({"success": true, "msg": "Order status successfully changed"});
    })
}

const denyOrder = async (req, res) => {
    const {idOrder} = req.body;

    OrdersModel.updateOne({idOrder: idOrder}, {$set: {status: "denied"}}).then(result => {
        res.status(200).send({"success": true, "msg": "Order status successfully changed"});
    })
}


module.exports = {
    addOrder,
    getAllOrders,
    acceptOrder,
    denyOrder
};

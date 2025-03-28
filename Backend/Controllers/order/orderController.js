import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import authOrderModel from '../../Models/authOrder.js';
import customerOrder from '../../Models/customerOrder.js';
import myShopWallet from '../../Models/myShopWallet.js';
import sellerWallet from '../../Models/sellerWallet.js';
import cardModel from '../../Models/cardModel.js';
import { responseReturn } from '../../utils/response.js';
import moment from 'moment';
import Stripe from 'stripe';

const { ObjectId } = mongoose.Types;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Payment check function
export const paymentCheck = async (id) => {
    try {
        const order = await customerOrder.findById(id);
        if (order.payment_status === 'unpaid') {
            await customerOrder.findByIdAndUpdate(id, {
                delivery_status: 'cancelled',
            });
            await authOrderModel.updateMany(
                { orderId: id },
                { delivery_status: 'cancelled' }
            );
        }
        return true;
    } catch (error) {
        console.log(error);
    }
};

// Place order function
export const place_order = async (req, res) => {
    const { price, products, shipping_fee, shippingInfo, userId } = req.body;
    let authorOrderData = [];
    let cardId = [];
    const tempDate = moment(Date.now()).format('LLL');

    let customerOrderProduct = [];

    for (let i = 0; i < products.length; i++) {
        const pro = products[i].products;
        for (let j = 0; j < pro.length; j++) {
            const tempCusPro = pro[j].productInfo;
            tempCusPro.quantity = pro[j].quantity;
            customerOrderProduct.push(tempCusPro);
            if (pro[j]._id) {
                cardId.push(pro[j]._id);
            }
        }
    }

    try {
        const order = await customerOrder.create({
            customerId: userId,
            shippingInfo,
            products: customerOrderProduct,
            price: price + shipping_fee,
            payment_status: 'unpaid',
            delivery_status: 'pending',
            date: tempDate,
        });

        for (let i = 0; i < products.length; i++) {
            const pro = products[i].products;
            const pri = products[i].price;
            const sellerId = products[i].sellerId;
            let storePor = [];
            for (let j = 0; j < pro.length; j++) {
                const tempPro = pro[j].productInfo;
                tempPro.quantity = pro[j].quantity;
                storePor.push(tempPro);
            }

            authorOrderData.push({
                orderId: order.id,
                sellerId,
                products: storePor,
                price: pri,
                payment_status: 'unpaid',
                shippingInfo: 'Easy Main Warehouse',
                delivery_status: 'pending',
                date: tempDate,
            });
        }

        await authOrderModel.insertMany(authorOrderData);
        for (let k = 0; k < cardId.length; k++) {
            await cardModel.findByIdAndDelete(cardId[k]);
        }

        // Use an arrow function to preserve the correct context
        setTimeout(() => {
            paymentCheck(order.id); // Call paymentCheck directly
        }, 15000);

        responseReturn(res, 200, { message: 'Order Placed Success', orderId: order.id });
    } catch (error) {
        console.log(error.message);
    }
};

// Get customer dashboard data
export const get_customer_dashboard_data = async (req, res) => {
    const { userId } = req.params;

    try {
        const recentOrders = await customerOrder.find({
            customerId: new ObjectId(userId),
        }).limit(5);
        const pendingOrder = await customerOrder.find({
            customerId: new ObjectId(userId),
            delivery_status: 'pending',
        }).countDocuments();
        const totalOrder = await customerOrder.find({
            customerId: new ObjectId(userId),
        }).countDocuments();
        const cancelledOrder = await customerOrder.find({
            customerId: new ObjectId(userId),
            delivery_status: 'cancelled',
        }).countDocuments();
        responseReturn(res, 200, {
            recentOrders,
            pendingOrder,
            totalOrder,
            cancelledOrder,
        });
    } catch (error) {
        console.log(error.message);
    }
};

// Get orders
export const get_orders = async (req, res) => {
    const { customerId, status } = req.params;

    try {
        let orders = [];
        if (status !== 'all') {
            orders = await customerOrder.find({
                customerId: new ObjectId(customerId),
                delivery_status: status,
            });
        } else {
            orders = await customerOrder.find({
                customerId: new ObjectId(customerId),
            });
        }
        responseReturn(res, 200, {
            orders,
        });
    } catch (error) {
        console.log(error.message);
    }
};

// Get order details
export const get_order_details = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await customerOrder.findById(orderId);
        responseReturn(res, 200, {
            order,
        });
    } catch (error) {
        console.log(error.message);
    }
};

// Get admin orders
export const get_admin_orders = async (req, res) => {
    let { page, searchValue, perPage } = req.query;
    page = parseInt(page);
    perPage = parseInt(perPage);

    const skipPage = perPage * (page - 1);

    try {
        if (searchValue) {
            // Add search functionality if needed
        } else {
            const orders = await customerOrder.aggregate([
                {
                    $lookup: {
                        from: 'authororders',
                        localField: '_id',
                        foreignField: 'orderId',
                        as: 'suborder',
                    },
                },
            ])
                .skip(skipPage)
                .limit(perPage)
                .sort({ createdAt: -1 });

            const totalOrder = await customerOrder.aggregate([
                {
                    $lookup: {
                        from: 'authororders',
                        localField: '_id',
                        foreignField: 'orderId',
                        as: 'suborder',
                    },
                },
            ]);

            responseReturn(res, 200, { orders, totalOrder: totalOrder.length });
        }
    } catch (error) {
        console.log(error.message);
    }
};

// Get admin order details
export const get_admin_order = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await customerOrder.aggregate([
            {
                $match: { _id: new ObjectId(orderId) },
            },
            {
                $lookup: {
                    from: 'authororders',
                    localField: '_id',
                    foreignField: 'orderId',
                    as: 'suborder',
                },
            },
        ]);
        responseReturn(res, 200, { order: order[0] });
    } catch (error) {
        console.log('get admin order details' + error.message);
    }
};

// Update admin order status
export const admin_order_status_update = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        await customerOrder.findByIdAndUpdate(orderId, {
            delivery_status: status,
        });
        responseReturn(res, 200, { message: 'Order Status change success' });
    } catch (error) {
        console.log('get admin status error' + error.message);
        responseReturn(res, 500, { message: 'Internal server error' });
    }
};

// Get seller orders
export const get_seller_orders = async (req, res) => {
    const { sellerId } = req.params;
    let { page, searchValue, perPage } = req.query;
    page = parseInt(page);
    perPage = parseInt(perPage);

    const skipPage = perPage * (page - 1);

    try {
        if (searchValue) {
            // Add search functionality if needed
        } else {
            const orders = await authOrderModel.find({
                sellerId,
            })
                .skip(skipPage)
                .limit(perPage)
                .sort({ createdAt: -1 });

            const totalOrder = await authOrderModel.find({
                sellerId,
            }).countDocuments();

            responseReturn(res, 200, { orders, totalOrder });
        }
    } catch (error) {
        console.log('get seller Order error' + error.message);
        responseReturn(res, 500, { message: 'Internal server error' });
    }
};

// Get seller order details
export const get_seller_order = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await authOrderModel.findById(orderId);
        responseReturn(res, 200, { order });
    } catch (error) {
        console.log('get seller details error' + error.message);
    }
};

// Update seller order status
export const seller_order_status_update = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        await authOrderModel.findByIdAndUpdate(orderId, {
            delivery_status: status,
        });
        responseReturn(res, 200, { message: 'Order status updated successfully' });
    } catch (error) {
        console.log('get seller Order error' + error.message);
        responseReturn(res, 500, { message: 'Internal server error' });
    }
};

// Create payment intent
export const create_payment = async (req, res) => {
    const { price } = req.body;

    try {
        const payment = await stripe.paymentIntents.create({
            amount: price * 100,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });
        responseReturn(res, 200, { clientSecret: payment.client_secret });
    } catch (error) {
        console.log(error.message);
    }
};

// Confirm order payment
export const order_confirm = async (req, res) => {
    const { orderId } = req.params;

    try {
        await customerOrder.findByIdAndUpdate(orderId, { payment_status: 'paid' });
        await authOrderModel.updateMany(
            { orderId: new ObjectId(orderId) },
            { payment_status: 'paid', delivery_status: 'pending' }
        );

        const cuOrder = await customerOrder.findById(orderId);
        const auOrder = await authOrderModel.find({
            orderId: new ObjectId(orderId),
        });

        const time = moment(Date.now()).format('l');
        const splitTime = time.split('/');

        await myShopWallet.create({
            amount: cuOrder.price,
            month: splitTime[0],
            year: splitTime[2],
        });

        for (let i = 0; i < auOrder.length; i++) {
            await sellerWallet.create({
                sellerId: auOrder[i].sellerId.toString(),
                amount: auOrder[i].price,
                month: splitTime[0],
                year: splitTime[2],
            });
        }

        responseReturn(res, 200, { message: 'Success' });
    } catch (error) {
        console.log(error.message);
    }
};
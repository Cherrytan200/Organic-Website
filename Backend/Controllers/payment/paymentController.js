import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import sellerModel from '../../Models/sellerModel.js';
import stripeModel from '../../Models/stripeModel.js';
import sellerWallet from '../../Models/sellerWallet.js';
import withdrowRequest from '../../Models/withdrowRequest.js';
import { responseReturn } from '../../utils/response.js';

const { ObjectId } = mongoose.Types;
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Stripe Connect Express Account
export const create_stripe_connect_account = async (req, res) => {
    const { id } = req;
    const uid = uuidv4();

    try {
        const existingStripe = await stripeModel.findOne({ sellerId: id });
        if (existingStripe) await stripeModel.deleteOne({ sellerId: id });

        const account = await stripe.accounts.create({ type: 'express' });

        const accountLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: 'http://localhost:5174/refresh',
            return_url: `http://localhost:5174/success?activeCode=${uid}`,
            type: 'account_onboarding',
        });

        await stripeModel.create({
            sellerId: id,
            stripeId: account.id,
            code: uid,
        });

        responseReturn(res, 201, { url: accountLink.url });

    } catch (error) {
        console.error('Stripe connect account error:', error);
        return responseReturn(res, 500, { message: 'Failed to create Stripe account' });
    }
};

// Activate Stripe Connect Account
export const active_stripe_connect_account = async (req, res) => {
    const { activeCode } = req.params;
    const { id } = req;

    try {
        const userStripeInfo = await stripeModel.findOne({ code: activeCode });

        if (userStripeInfo) {
            await sellerModel.findByIdAndUpdate(id, { payment: 'active' });
            return responseReturn(res, 200, { message: 'Payment Active' });
        } else {
            return responseReturn(res, 404, { message: 'Activation Failed' });
        }

    } catch (error) {
        console.error('Activation error:', error);
        return responseReturn(res, 500, { message: 'Internal Server Error' });
    }
};

// Utility: Sum Amount
export const sumAmount = (data) => {
    return data.reduce((sum, entry) => sum + entry.amount, 0);
};

// Get Seller Payment Details
export const get_seller_payment_details = async (req, res) => {
    const { sellerId } = req.params;

    try {
        const payments = await sellerWallet.find({ sellerId });

        const pendingWithdrows = await withdrowRequest.find({ sellerId, status: 'pending' });
        const successWithdrows = await withdrowRequest.find({ sellerId, status: 'success' });

        const totalAmount = sumAmount(payments);
        const pendingAmount = sumAmount(pendingWithdrows);
        const withdrowAmount = sumAmount(successWithdrows);

        let availableAmount = totalAmount - (pendingAmount + withdrowAmount);
        if (availableAmount < 0) availableAmount = 0;

        responseReturn(res, 200, {
            totalAmount,
            pendingAmount,
            withdrowAmount,
            availableAmount,
            pendingWithdrows,
            successWithdrows,
        });

    } catch (error) {
        console.error('Get seller payment details error:', error);
        return responseReturn(res, 500, { message: 'Internal Server Error' });
    }
};

// Withdraw Request
export const withdrowal_request = async (req, res) => {
    const { amount, sellerId } = req.body;

    try {
        const withdrowal = await withdrowRequest.create({
            sellerId,
            amount: parseInt(amount),
        });
        return responseReturn(res, 200, { withdrowal, message: 'Withdrawal Request Sent' });

    } catch (error) {
        console.error('Withdrawal request error:', error);
        return responseReturn(res, 500, { message: 'Internal Server Error' });
    }
};

// Admin - Get Pending Payment Requests
export const get_payment_request = async (req, res) => {
    try {
        const withdrowalRequestList = await withdrowRequest.find({ status: 'pending' });
        return responseReturn(res, 200, { withdrowalRequest: withdrowalRequestList });

    } catch (error) {
        console.error('Get payment request error:', error);
        return responseReturn(res, 500, { message: 'Internal Server Error' });
    }
};

// Admin - Confirm Payment Request
export const payment_request_confirm = async (req, res) => {
    const { paymentId } = req.body;

    try {
        const payment = await withdrowRequest.findById(paymentId);
        const stripeData = await stripeModel.findOne({
            sellerId: new ObjectId(payment.sellerId),
        });

        if (!stripeData || !stripeData.stripeId) {
            return responseReturn(res, 404, { message: 'Stripe account not found' });
        }

        await stripe.transfers.create({
            amount: payment.amount * 100, // Stripe accepts amounts in cents
            currency: 'usd',
            destination: stripeData.stripeId,
        });

        await withdrowRequest.findByIdAndUpdate(paymentId, { status: 'success' });
        return responseReturn(res, 200, { payment, message: 'Request Confirmed Successfully' });

    } catch (error) {
        console.error('Payment request confirm error:', error);
        return responseReturn(res, 500, { message: 'Internal Server Error' });
    }
};

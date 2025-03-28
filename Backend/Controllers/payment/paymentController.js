import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();
import sellerModel from '../../Models/sellerModel.js'
import stripeModel from '../../Models/stripeModel.js'
import sellerWallet from '../../Models/sellerWallet.js'
import withdrowRequest from '../../Models/withdrowRequest.js'
import { responseReturn } from '../../utils/response.js'
const {ObjectId}=mongoose.Types.ObjectId;

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



   export const create_stripe_connect_account = async(req,res) => {
        const {id} = req 
        const uid = uuidv4()

    try {
        const stripeInfo = await stripeModel.findOne({ sellerId: id  })

        if (stripeInfo) {
            await stripeModel.deleteOne({ sellerId: id })
            const account = await stripe.accounts.create({ type: 'express' }) 

            const accountLink = await stripe.accountLinks.create({
                account: account.id,
                refresh_url: 'http://localhost:5174/refresh',
                return_url:  `http://localhost:5174/success?activeCode=${uid}`,
                type: 'account_onboarding'
            })
            await stripeModel.create({
                sellerId: id,
                stripeId: account.id,
                code: uid
            })
            responseReturn(res,201,{url:accountLink.url })

        }else{
            const account = await stripe.accounts.create({ type: 'express' }) 

            const accountLink = await stripe.accountLinks.create({
                account: account.id,
                refresh_url: 'http://localhost:5174/refresh',
                return_url:  `http://localhost:5174/success?activeCode=${uid}`,
                type: 'account_onboarding'
            })
            await stripeModel.create({
                sellerId: id,
                stripeId: account.id,
                code: uid
            })
            responseReturn(res,201,{url:accountLink.url })

        }
        
    } catch (error) {
        console.log('strpe connect account errror' + error.message)
     }
    }
    // End Method 


    export const active_stripe_connect_account = async (req, res) => {
       const {activeCode} = req.params 
       const {id} = req

       try {
            const userStripeInfo = await stripeModel.findOne({ code: activeCode })

            if (userStripeInfo) {
                await sellerModel.findByIdAndUpdate(id,{  
                  payment: 'active'
                })
                responseReturn(res, 200, {message: 'payment Active'})
            } else {
                responseReturn(res, 404, {message: 'payment Active Fails'})
            } 

       } catch (error) {
        responseReturn(res, 500, {message: 'Internal Server Error'})
       } 

    }
      // End Method 

    export const sumAmount = (data) => {
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
            sum = sum + data[i].amount;            
        }
        return sum
    }  


    export const get_seller_payment_details = async (req, res) => {
    const {sellerId} = req.params
    
    try {
        const payments = await sellerWallet.find({ sellerId }) 

        const pendingWithdrows = await withdrowRequest.find({
            $and: [
                {
                    sellerId: {
                        $eq: sellerId
                    }
                },
                {
                    status: {
                        $eq: 'pending'
                    }
                }
            ]
        })

        const successWithdrows = await withdrowRequest.find({
            $and: [
                {
                    sellerId: {
                        $eq: sellerId
                    }
                },
                {
                    status: {
                        $eq: 'success'
                    }
                }
            ]
        })

        const pendingAmount = this.sumAmount(pendingWithdrows)
        const withdrowAmount = this.sumAmount(successWithdrows)
        const totalAmount = this.sumAmount(payments)

        let availableAmount = 0;

        if (totalAmount > 0) {
            availableAmount = totalAmount - (pendingAmount + withdrowAmount)
        }

        responseReturn(res, 200,{
            totalAmount,
            pendingAmount,
            withdrowAmount,
            availableAmount,
            pendingWithdrows,
            successWithdrows 
        })
        
    } catch (error) {
        console.log(error.message)
    } 
     
    }
    // End Method 


    export const withdrowal_request = async (req, res) => {
        const {amount,sellerId} = req.body

        try {
            const withdrowal = await withdrowRequest.create({
                sellerId,
                amount: parseInt(amount)
            })
            responseReturn(res, 200,{ withdrowal, message: 'Withdrowal Request Send'})
        } catch (error) {
            responseReturn(res, 500,{ message: 'Internal Server Error'})
        }
    }
  // End Method 

  export const get_payment_request = async (req, res) => {
    try {
        const withdrowalRequest = await withdrowRequest.find({ status: 'pending'})
        responseReturn(res, 200, {withdrowalRequest })
    } catch (error) {
        responseReturn(res, 500,{ message: 'Internal Server Error'})
    }
  }
    // End Method 

    export const payment_request_confirm = async (req, res) => {
        const {paymentId} = req.body 
        try {
            const payment = await withdrowRequest.findById(paymentId)
            const {stripeId} = await stripeModel.findOne({
                sellerId: new ObjectId(payment.sellerId)
            })

            await stripe.transfers.create({
                amount: payment.amount * 100,
                currency: 'usd',
                destination: stripeId
            })
             
            await withdrowRequest.findByIdAndUpdate(paymentId, {status: 'success'})
            responseReturn(res, 200, {payment, message: 'Request Confirm Success'})

        } catch (error) {   
            responseReturn(res, 500,{ message: 'Internal Server Error'})
        }
    }
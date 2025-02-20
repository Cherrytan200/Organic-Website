import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

import homeRoutes from './routes/home/homeRoutes.js'
import orderRoutes from './routes/order/orderRoutes.js'
import cardRoutes from './routes/home/cardRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import dashboardRoutes from './routes/dashboard/dashboardRoutes.js'
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from './routes/dashboard/categoryRoutes.js'
import productRoutes from './routes/dashboard/productRoutes.js'
import sellerRoutes from './routes/dashboard/sellerRoutes.js'
import customerAuthRoutes from './routes/home/customerAuthRoutes.js'
const app=express();



import http from 'http';
const server=http.createServer(app);

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { dbConnect } from "./utils/db.js";



// const port=process.env.PORT || 5000
// dbConnect();


app.use(cors({
    origin:['http://localhost:5173','http://localhost:5174'],
    credentials:true
}))

import { Server } from "socket.io";

const io = new Server(server, {
    cors: {
        origin: '*',
        credentials: true
    }
});

let allCustomer = []
let allSeller = []
let admin = {}


const addUser = (customerId,socketId,userInfo) => {
    const checkUser = allCustomer.some(u => u.customerId === customerId)
    if (!checkUser) {
        allCustomer.push({
            customerId,
            socketId,
            userInfo
        })
    }
} 


const addSeller = (sellerId,socketId,userInfo) => {
    const checkSeller = allSeller.some(u => u.sellerId === sellerId)
    if (!checkSeller) {
        allSeller.push({
            sellerId,
            socketId,
            userInfo
        })
    }
} 

const findCustomer = (customerId) => {
    return allCustomer.find(c => c.customerId === customerId)
}


const findSeller = (sellerId) => {
    return allSeller.find(c => c.sellerId === sellerId)
}


const remove = (socketId) => {
    allCustomer = allCustomer.filter(c => c.socketId !== socketId)
    allSeller = allSeller.filter(c => c.socketId !== socketId)
}


io.on('connection', (soc) => {
    console.log('socket server running..')

    soc.on('add_user',(customerId,userInfo)=>{
         addUser(customerId,soc.id,userInfo)
         io.emit('activeSeller', allSeller) 
    })
    soc.on('add_seller',(sellerId, userInfo) => {
       addSeller(sellerId,soc.id,userInfo)
       io.emit('activeSeller', allSeller) 
    })
    soc.on('send_seller_message',(msg) => {
        const customer = findCustomer(msg.receverId)
        if (customer !== undefined) {
            soc.to(customer.socketId).emit('seller_message', msg)
        }
    })  
    soc.on('send_customer_message',(msg) => {
        const seller = findSeller(msg.receverId)
        if (seller !== undefined) {
            soc.to(seller.socketId).emit('customer_message', msg)
        }
    })  

    soc.on('send_message_admin_to_seller',(msg) => {
        const seller = findSeller(msg.receverId)
        if (seller !== undefined) {
            soc.to(seller.socketId).emit('receved_admin_message', msg)
        }
    })

    soc.on('send_message_seller_to_admin',(msg) => { 
        if (admin.socketId) {
            soc.to(admin.socketId).emit('receved_seller_message', msg)
        }
    })



    soc.on('add_admin', (adminInfo) => { 
        // Ensure admin is always an object
        if (typeof adminInfo === 'object' && adminInfo !== null) {
            delete adminInfo.email;
            delete adminInfo.password;
            admin = { ...adminInfo, socketId: soc.id };
        } else {
            admin = { socketId: soc.id };
        }
        io.emit('activeSeller', allSeller); 
    });
    

    soc.on('disconnect',() => {
        console.log('user disconnect')
        remove(soc.id)
        io.emit('activeSeller', allSeller) 
    })


})


app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/home',homeRoutes);
app.use('/api',orderRoutes);
app.use('/api',cardRoutes);
app.use('/api',authRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',sellerRoutes);
app.use('/api',customerAuthRoutes);
app.use('/api',chatRoutes);
app.use('/api',paymentRoutes);
app.use('/api',dashboardRoutes);


app.get("/",(req,res)=>res.send('My Backend'))
const port=process.env.PORT || 5000
dbConnect();
server.listen(port,()=>
    console.log(`Server started on port: ${port}`),
);
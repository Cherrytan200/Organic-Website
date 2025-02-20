import {Schema,model} from 'mongoose';

const adminSellerMsgSchema = new Schema({
    senderName: {
        type: String,
        required : true
    },
    senderId: {
        type: String,
        default : ''
    },
    receverId: {
        type: String,
        default : ''
    },
    message: {
        type: String,
        required : true
    },
    status: {
        type: String,
        default : 'unseen'
    } 
     
}, {timestamps: true})

export default model('seller_admin_messages',adminSellerMsgSchema)
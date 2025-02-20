import authReducer from "./Reducers/authReducer.js";
import categoryReducer from "./Reducers/categoryReducer.js";
import productReducer  from "./Reducers/productReducer.js";
import sellerReducer from "./Reducers/sellerReducer.js";
import OrderReducer  from './Reducers/OrderReducer';
import chatReducer from './Reducers/chatReducer.js'
import PaymentReducer from './Reducers/paymentReducer.js';
import dashboardReducer from './Reducers/dashBoardReducer.js';
import bannerReducer from './Reducers/bannerReducer.js'

const rootReducer={
    auth:authReducer,
    category:categoryReducer,
    product:productReducer,
    seller:sellerReducer,
    chat:chatReducer,
    order:OrderReducer,
    payment:PaymentReducer,
    dashboard:dashboardReducer,
    banner:bannerReducer
}

export default rootReducer;
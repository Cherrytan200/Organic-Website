import authReducer from "./Reducers/authReducer.js";
import categoryReducer from "./Reducers/categoryReducer.js";
import productReducer  from "./Reducers/productReducer.js";
import sellerReducer from "./Reducers/sellerReducer.js";
const rootReducer={
    auth:authReducer,
    category:categoryReducer,
    product:productReducer,
    seller:sellerReducer
}

export default rootReducer;
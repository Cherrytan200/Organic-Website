import authReducer from "./Reducers/authReducer.js";
import categoryReducer from "./Reducers/categoryReducer.js";
const rootReducer={
    auth:authReducer,
    category:categoryReducer
}

export default rootReducer;
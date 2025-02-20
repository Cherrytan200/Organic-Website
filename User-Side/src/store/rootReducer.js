import authReducer from "./reducers/authReducer.js";
import cardReducer from "./reducers/cardReducer.js";
import chatReducer from "./reducers/chatReducer.js";
import dashboardReducer from "./reducers/dashboardReducer.js";
import homeReducer from "./reducers/homeReducer.js";
import orderReducer from "./reducers/orderReducer.js";

const rootReducer = {
    home: homeReducer,
    auth: authReducer,
    card: cardReducer,
    order: orderReducer,
    dashboard: dashboardReducer,
    chat: chatReducer
}
export default rootReducer;
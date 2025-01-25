import { adminRoutes } from "./adminRoutes.jsx";
import { sellerRoutes } from "./sellerRoutes.jsx";

export const privateRoutes = [...adminRoutes, ...sellerRoutes];
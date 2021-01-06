import { combineReducers } from "redux";
import { admin } from "./admin";
import { customer } from "./customer";
import { productType } from "./productType";
import { product } from "./product";

export const reducers = combineReducers({
  admin,
  customer,
  productType,
  product,
});

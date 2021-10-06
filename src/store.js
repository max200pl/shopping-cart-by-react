import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import { productsReducer } from "./reducers/productReducers";

const initialState = {};
// @ts-ignore
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // send data to dev tules react extension in chrome 

const store = createStore(
     combineReducers({
          products: productsReducer
     }),
     initialState,
     composeEnhancer(applyMiddleware(thunk))
)

export default store;
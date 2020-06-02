import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index';
import {filterWordsMiddleware} from './middleware'
import createSagaMiddleware from "redux-saga";
import apiSaga from "./sagas/api-saga";

const initializeSagaMiddleWare = createSagaMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(filterWordsMiddleware,initializeSagaMiddleWare),
);

initializeSagaMiddleWare.run(apiSaga);

export default store;
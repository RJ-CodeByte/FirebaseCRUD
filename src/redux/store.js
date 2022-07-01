import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import todoReducer from './reducers/auth';

const rootReducer = combineReducers({ todoReducer })

export const Store = createStore(rootReducer, applyMiddleware(thunk));
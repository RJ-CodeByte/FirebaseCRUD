import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import todoReducer from '../redux/reducers';

const rootReducer = combineReducers({ todoReducer })

export const Store = createStore(rootReducer, applyMiddleware(thunk));
Store.subscribe(() => console.log('first', Store.getState()))
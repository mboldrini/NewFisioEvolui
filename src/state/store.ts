import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// importa todos os reducers q foram centralizados no index
import rootReducer from './reducers/index';

export const store = createStore(
    rootReducer,
    {}, // initialState,
    applyMiddleware(thunk)
);

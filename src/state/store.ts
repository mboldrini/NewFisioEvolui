import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// importa todos os reducers q foram centralizados no index
import rootReducer from './reducers/index';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistedReducer = persistReducer({
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user', 'apiReducer', 'atendimentoReducer', 'formasPgtoReducer'],// testar caso n pegue, o nome 'userReducer''
    blacklist: []
}, rootReducer);

/*export*/ const store = createStore(
    persistedReducer,// erra o rootReducer
    {}, // initialState,
    applyMiddleware(thunk)
);
let persistor = persistStore(store);

// novo com o persistor
export {store, persistor};
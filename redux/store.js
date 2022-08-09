import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { devToolsEnhancer } from "redux-devtools-extension";
import reducers from "./reducers/reducers";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const initialState = {};
const store = createStore(persistedReducer, initialState, devToolsEnhancer());
const persistor = persistStore(store);

const configStore = { store, persistor };

export default configStore;

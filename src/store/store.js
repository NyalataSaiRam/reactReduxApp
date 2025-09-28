import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postSlice";

// for redux-persist
// 1. import below things
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// 2. define persist reducer configuration
const persistReducerConfig = {
    key: "root",
    storage,
    whitelist: [ "posts" ]
};

// 3. create persistReducer
const persistedPostReducer = persistReducer(persistReducerConfig, postReducer);

// 4. change regular reducer with persistedReducer
export const store = configureStore({
    reducer: {
        posts: persistedPostReducer
    },
    // 7. add middleware to solve error related to 'register' in console
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [ 'register' ],
            }
        });
    }
});

// 5. export persisted store
export const persistor = persistStore(store);

// 6. wrap <App/> in <PersistGate> . provide persistor and loading element to PersistGate as arguments.
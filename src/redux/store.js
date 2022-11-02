
import { configureStore } from "@reduxjs/toolkit";
import { clientsReducer } from "./slices/clients";


const store = configureStore ({
    reducer: {
        clients: clientsReducer
    }
})

export default store; 
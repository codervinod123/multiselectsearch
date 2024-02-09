import {configureStore} from "@reduxjs/toolkit"
import themeslice from "./themeslice";

const store=configureStore({
    reducer: {
        themeslice:themeslice,
    }
})

export default store;

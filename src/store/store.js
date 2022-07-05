import { configureStore  } from "@reduxjs/toolkit";
import tasksReducer from "./slices/slice.tasks";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer
    }
});

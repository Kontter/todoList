import { configureStore } from "@reduxjs/toolkit";
import {TodoListReducer} from '../modules/TodoListModule/store/todoListSlice'

export const store = configureStore({
  reducer: {
    TodoListReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>       
export type AppDispatch = typeof store.dispatch   
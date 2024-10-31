import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IData, ITodo } from "../models/todoList"
import { ALL_TASKS_FILTER } from "../helpers/variables"

const initialState: IData = {
  todoList: [],
  cartTodoList: [],
  completedTasks: 0,
  uncompletedTasks: 0,
  allTasks: 0,
  cartTasks: 0,
  filter: ALL_TASKS_FILTER,
  isAuth: false
}

export const TodoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
      addTodo (state, action: PayloadAction<ITodo>)  {
        state.todoList.push(action.payload)
        state.allTasks += 1
        state.uncompletedTasks += 1
      },
      toggleTodo (state, action: PayloadAction<number>) {
        const targetTodoIndex = state.todoList.findIndex( (todo: ITodo) => todo.id === action.payload)
        
        if(state.todoList[targetTodoIndex].isComlpeted) {
           state.completedTasks -= 1
           state.uncompletedTasks += 1
         } else {
          state.completedTasks += 1
          state.uncompletedTasks -= 1
        }

        state.todoList[targetTodoIndex].isComlpeted = !state.todoList[targetTodoIndex].isComlpeted
      },
      setfilter (state, action: PayloadAction<string>) {
        state.filter = action.payload
      },
      removeTodo (state, action: PayloadAction<number>) {
        const targetTodo = state.todoList.find( (todo: ITodo) => todo.id === action.payload)
        const targetTodoIndex =  state.todoList.findIndex( (todo: ITodo) => todo.id === action.payload)

        if(targetTodo) {
          state.cartTodoList.push(targetTodo)
        }
        state.todoList.splice(targetTodoIndex, 1)

        if(targetTodo?.isComlpeted) {
          state.completedTasks -= 1
        } else {
          state.uncompletedTasks -= 1
        }

        state.allTasks -= 1
        state.cartTasks += 1
      },
      removeCartTodo (state, action: PayloadAction<number>) {
        const targetTodoIndex =  state.cartTodoList.findIndex( (todo: ITodo) => todo.id === action.payload)
        state.cartTodoList.splice(targetTodoIndex, 1)
        state.cartTasks -= 1
      },
      removeAllTodos (state, action: PayloadAction<ITodo[] | undefined>) {
        
        if(action.payload) {
          state.allTasks -= action.payload.length
          state.cartTasks += action.payload.length

          for(let todo of action.payload) {

            if(todo.isComlpeted) {
              state.completedTasks -= 1
            } else {
              state.uncompletedTasks -= 1
            }

            state.cartTodoList.push(todo)
            const targetTodoIndex = state.todoList.findIndex((todoItem: ITodo) => todoItem.id === todo.id)
            state.todoList.splice(targetTodoIndex, 1)
          }
        }
      },
      removeAllCartTodos (state) {
        state.cartTodoList = []
        state.cartTasks = 0
      },
      setTodoList (state, action: PayloadAction<ITodo[]>) {
        state.todoList = action.payload
      },
      setCartTodoList (state, action: PayloadAction<ITodo[]>) {
        state.cartTodoList = action.payload
      },
      setCompletedTasks (state, action: PayloadAction<number>) {
        state.completedTasks = action.payload
      },
      setUncompletedTasks (state, action: PayloadAction<number>) {
        state.uncompletedTasks = action.payload
      },
      setAllTasks (state, action: PayloadAction<number>) {
        state.allTasks = action.payload
      },
      setCartTasks (state, action: PayloadAction<number>) {
        state.cartTasks = action.payload
      },
      setAuth (state, action: PayloadAction<boolean>) {
        state.isAuth = action.payload
      },
  }
})


export const TodoListReducer = TodoListSlice.reducer
export const { 
  addTodo, 
  toggleTodo, 
  setfilter, 
  removeTodo, 
  removeCartTodo, 
  removeAllTodos, 
  removeAllCartTodos,
  setTodoList,
  setCartTodoList,
  setCompletedTasks,
  setUncompletedTasks,
  setAllTasks,
  setCartTasks,
  setAuth } = TodoListSlice.actions
import { useEffect } from 'react'
import './App.css'
import ToDoListModule from './modules/TodoListModule'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { setAuth } from './modules/TodoListModule/store/todoListSlice'

export default function App() {

  const isAuth = useAppSelector(state => state.TodoListReducer.isAuth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(localStorage.getItem('auth') === 'true') {
      dispatch(setAuth(true))
    }
  }, [isAuth])

  return (
    <Routes>
      {isAuth 
        ?
          <>
            <Route path='/todolist' element={<ToDoListModule/>}/>
            <Route path='/*' element={<ToDoListModule/>}/>
          </>
        :
          <>
          <Route path='/login' element={<Login/>}/>
          <Route path='/*' element={<Login/>}/>
          </>
    }
    </Routes>
  )
}

import { useEffect, useMemo, useState } from 'react'
import TodoListItem from '../TodoListItem/TodoListItem'
import styles from './TodoList.module.css'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { ALL_TASKS_FILTER, CART_FILTER, COMPLETED_TASKS_FILTER, UNCOMPLETED_TASKS_FILTER } from '../../helpers/variables'
import { IData, ITodo } from '../../models/todoList'
import { removeAllCartTodos, removeAllTodos, setAllTasks, setCartTasks, setCartTodoList, setCompletedTasks, setTodoList, setUncompletedTasks, setfilter } from '../../store/todoListSlice'

const TodoList = () => {

  const todoList = useAppSelector(state => state.TodoListReducer.todoList) 
  const cartTodoList = useAppSelector(state => state.TodoListReducer.cartTodoList) 
  const filter = useAppSelector(state => state.TodoListReducer.filter) 
  const completedTasks = useAppSelector(state => state.TodoListReducer.completedTasks) 
  const uncompletedTasks = useAppSelector(state => state.TodoListReducer.uncompletedTasks) 
  const allTasks = useAppSelector(state => state.TodoListReducer.allTasks) 
  const cartTasks = useAppSelector(state => state.TodoListReducer.cartTasks) 
  const dispatch = useAppDispatch()

  const [isInCart, setIsInCart] = useState(false)

  const sortedTodoList = useMemo(() => {

    if(filter === UNCOMPLETED_TASKS_FILTER) {
      const uncompletedTodoList = todoList.filter((todo: ITodo) => todo.isComlpeted === false)
      setIsInCart(false)
      return uncompletedTodoList
    } 

    if(filter === ALL_TASKS_FILTER) {
      setIsInCart(false)
      return todoList
    }

    if(filter === COMPLETED_TASKS_FILTER) {
      const completedTodoList = todoList.filter((todo: ITodo) => todo.isComlpeted === true)
      setIsInCart(false)
      return completedTodoList
    } 

    if(filter === CART_FILTER) {
      setIsInCart(true)
      return cartTodoList
    }
    
  }, [todoList, filter, cartTodoList])

  useEffect(() => {
    if(localStorage.getItem('data')) {

      const data: IData = JSON.parse(localStorage.getItem('data'))
      
      dispatch(setTodoList(data.todoList))
      dispatch(setCartTodoList(data.cartTodoList))
      dispatch(setfilter(data.filter))
      dispatch(setCompletedTasks(data.completedTasks))
      dispatch(setUncompletedTasks(data.uncompletedTasks))
      dispatch(setAllTasks(data.allTasks))
      dispatch(setCartTasks(data.cartTasks))
    }
  }, [])


  useEffect(() => {
    const data: IData = {
      todoList,
      cartTodoList,
      filter,
      completedTasks,
      uncompletedTasks,
      allTasks,
      cartTasks
    }
 
    localStorage.setItem('data', JSON.stringify(data))
    
  }, [todoList, filter, cartTodoList])

  return (
    <>
      {sortedTodoList?.length !== 0 
        ? 
          <>
            <button 
              onClick={() => isInCart === true ? dispatch(removeAllCartTodos()) : dispatch(removeAllTodos(sortedTodoList))}
              className={styles.todoList__removeAllBtn}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="#38383a" width="35px" height="35px" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            </button>
            <ul className={styles.todoList}>
              {sortedTodoList?.map((todo: ITodo) => 
                <TodoListItem 
                  key={todo.id} 
                  todo={todo}
                  isInCart={isInCart}
                />)}
            </ul>
          </>
        :
          <h3 className={styles.todoList__alert}>Нет Задач</h3>
      }
    </>
  )
}

export default TodoList
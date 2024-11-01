import { useEffect, useState } from 'react'
import styles from './TodoListFilters.module.css'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { setfilter } from '../../store/todoListSlice'
import { ALL_TASKS_FILTER, CART_FILTER, COMPLETED_TASKS_FILTER, UNCOMPLETED_TASKS_FILTER } from '../../helpers/variables'

const TodoListFilters = () => {

  const [isActiveFilter, setIsActiveFilter] = useState<string>('')

  const uncompletedTasks = useAppSelector(state => state.TodoListReducer.uncompletedTasks)
  const completedTasks = useAppSelector(state => state.TodoListReducer.completedTasks)
  const allTasks = useAppSelector(state => state.TodoListReducer.allTasks)
  const cartTasks = useAppSelector(state => state.TodoListReducer.cartTasks)
  const filter = useAppSelector(state => state.TodoListReducer.filter)
  const dispatch = useAppDispatch()

  const setCurrentTasks = () => {
    dispatch(setfilter(UNCOMPLETED_TASKS_FILTER))
    setIsActiveFilter(UNCOMPLETED_TASKS_FILTER)
  }

  const setAllTasks = () => {
    dispatch(setfilter(ALL_TASKS_FILTER))
    setIsActiveFilter(ALL_TASKS_FILTER)
  }

  const setComlpetedTasks = () => {
    dispatch(setfilter(COMPLETED_TASKS_FILTER))
    setIsActiveFilter(COMPLETED_TASKS_FILTER)
  }

  const setCart = () => {
    dispatch(setfilter(CART_FILTER))
    setIsActiveFilter(CART_FILTER)
  }

  useEffect(() => {
    setIsActiveFilter(filter)
  }, [filter])

  return (
    <ul className={styles.filter_list}>
      <li>
        <button 
          style={isActiveFilter === UNCOMPLETED_TASKS_FILTER ? {color: 'white', borderBottom: '2px solid #5a7bb6'} : {}} 
          className={styles.filter_list__btn}
          onClick={() => setCurrentTasks()}
        >
            ТЕКУЩИЕ ДЕЛА {uncompletedTasks > 0 ? `(${uncompletedTasks})` : ''}
        </button>
      </li>
      <li>

        <button 
          style={isActiveFilter === ALL_TASKS_FILTER ? {color: 'white', borderBottom: '2px solid #5a7bb6'} : {}} 
          className={styles.filter_list__btn}
          onClick={() => setAllTasks()}
        >
            ВСЕ ДЕЛА {allTasks > 0 ? `(${allTasks})` : ''}
        </button>
      </li>

      <li>
        <button 
          style={isActiveFilter === COMPLETED_TASKS_FILTER ? {color: 'white', borderBottom: '2px solid #5a7bb6'} : {}} 
          className={styles.filter_list__btn}
          onClick={() => setComlpetedTasks()}
        >
            ВЫПОЛНЕННЫЕ ДЕЛА {completedTasks > 0 ? `(${completedTasks})` : ''}
        </button>
      </li>

      <li>
        <button 
          style={isActiveFilter === CART_FILTER ? {color: 'white', borderBottom: '2px solid #5a7bb6'} : {}} 
          className={styles.filter_list__btn}
          onClick={() => setCart()}
        >
            КОРЗИНА {cartTasks > 0 ? `(${cartTasks})` : ''}
        </button>
      </li>
    </ul>
  )
}

export default TodoListFilters
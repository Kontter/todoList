import styles from './index.module.css'
import TodoListForm from './components/TodoListForm/TodoListForm'
import TodoListFilters from './components/TodoListFilters/TodoListFilters'
import TodoList from './components/TodoList/TodoList'
import Button from '../../components/UI/Button/Button'
import { useAppDispatch } from '../../hooks/redux'
import { setAuth } from './store/todoListSlice'

export default function ToDoListModule() {

  const dispatch = useAppDispatch()

  const logOut = () => {
    localStorage.removeItem('auth')
    dispatch(setAuth(false))
  }

  return (
    <div className={styles.wrapper}>
      <Button
        onClick={() => logOut()}
        redBackground
        style={{justifyContent: 'center'}}
      >
        Выйти
      </Button>
      <TodoListForm/>
      <div className={styles.todoList_wrapper}>
        <TodoListFilters/>
        <TodoList/>
      </div>
    </div>
  )
}

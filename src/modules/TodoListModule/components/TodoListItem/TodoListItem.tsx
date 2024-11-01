import { FC } from 'react'
import styles from './TodoListItem.module.css'
import { ITodo } from '../../models/todoList'
import { useAppDispatch } from '../../../../hooks/redux'
import { removeCartTodo, removeTodo, toggleTodo } from '../../store/todoListSlice'


interface TodoListItemProps {
  todo: ITodo,
  isInCart: boolean
}

const TodoListItem: FC<TodoListItemProps> = ({todo, isInCart}) => {
  const {id, text, isComlpeted} = todo

  const dispatch = useAppDispatch()
  
  return (
    <li>
      <article className={styles.todoList__Item}>
        {text} 
        <ul>
          <li>
            <button 
              onClick={() => isInCart === false && dispatch(toggleTodo(id))} 
              className={styles.todoList__comleteBtn}
              style={isInCart === true ? {pointerEvents: 'none'} : {}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill={isComlpeted ? '#2459b4' : "#38383a"}><path d="M400-318 247-471l42-42 111 111 271-271 42 42-313 313Z"/></svg>
            </button>
          </li>
          <li>
            <button
              onClick={() => isInCart === true ? dispatch(removeCartTodo(id)) : dispatch(removeTodo(id))}
              className={styles.todoList__removeBtn}
              >
              <svg xmlns="http://www.w3.org/2000/svg" fill="#38383a" width="35px" height="35px" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            </button>
          </li>
        </ul>
      </article>
    </li>
  )
}

export default TodoListItem
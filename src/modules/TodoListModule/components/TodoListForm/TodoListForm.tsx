import React, { useState } from 'react'
import styles from './TodoListForm.module.css'
import Button from '../../../../components/UI/Button/Button'
import Input from '../../../../components/UI/Input/Input'
import { ITodo } from '../../models/todoList'
import { useAppDispatch } from '../../../../hooks/redux'
import { addTodo } from '../../store/todoListSlice'

const TodoListForm =() => {

  const [inputText, setInputText] = useState<string>('')

  const dispatch = useAppDispatch()

  const addNewTodo = () => {
    const newTodo: ITodo = {
      id: Date.now(),
      text: inputText.trim(),
      isComlpeted: false
    }

    dispatch(addTodo(newTodo))
    setInputText('')
  }

  return (
    <form className={styles.form}>
      <Button onClick={() => addNewTodo()} blueBackground>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
        ДОБАВИТЬ
      </Button>

      <Input 
        value={inputText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
        placeholder='Пополните список...'
        type='text'
        />

      <Button 
        onClick={() => setInputText('')} 
        redBackground
      >
        ОЧИСТИТЬ
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M120-280v-80h560v80H120Zm80-160v-80h560v80H200Zm80-160v-80h560v80H280Z"/></svg>
      </Button>
  </form>
  )
}

export default TodoListForm
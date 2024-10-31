import { useState } from "react"
import Button from "../UI/Button/Button"
import Input from "../UI/Input/Input"
import styles from './Login.module.css'
import { setAuth } from "../../modules/TodoListModule/store/todoListSlice"
import { useAppDispatch } from "../../hooks/redux"

const Login = () => {

  const [loginText, setLoginText] = useState<string>('')
  const [passwordText, setPasswordText] = useState<string>('')

  const dispatch = useAppDispatch()

  const login = () => {
    if(loginText === 'admin' && passwordText === 'admin') {
      localStorage.setItem('auth', 'true')
      dispatch(setAuth(true))
    }
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.login_form}>
        <Input
          value={loginText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginText(e.target.value)}
          placeholder='Логин...'
        />
        <Input
          value={passwordText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordText(e.target.value)}
          placeholder='Пароль...'
        />
        <Button 
          onClick={() => login()}
          blueBackground
        >
          Войти
        </Button>
      </form>
    </div>
  )
}

export default Login
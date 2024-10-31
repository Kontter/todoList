import React, { FC } from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode,
  redBackground?: boolean
  blueBackground?: boolean,
  [anyProp: string]: any
}

const Button: FC<ButtonProps> = ({children, redBackground, blueBackground, ...props}) => {

  const rootClasses = [styles.btn]

  if(redBackground) {
    rootClasses.push(styles.redBackGround)
  }

  if(blueBackground) {
    rootClasses.push(styles.blueBackground)
  }

  return (
    <button 
      {...props}
      type='button'
      className={rootClasses.join(' ')}
    >
      {children}
    </button>
  )
}

export default Button
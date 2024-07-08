import React from 'react';
import './Button.css';


interface ButtonProps {
    onClick: () => void;
    text: string;
}

const Button = (props: ButtonProps) => {

  return (
    <button className='btn-structure' onClick={props.onClick}>
    <p className='btn-text'>{props.text}</p>
  </button>
  )
}

export default Button;

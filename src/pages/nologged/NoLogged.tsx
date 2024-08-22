import React from 'react'
import { Link } from 'react-router-dom'

export default function NoLogged() {
  return (
    <div>
        
        <h1>No NoLogged</h1>
        <p>Please Log in and try again</p>
        <Link to="/login"/>
    </div>
  )
}

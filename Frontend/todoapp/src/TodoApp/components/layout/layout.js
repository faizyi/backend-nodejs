import React from 'react'
import Header from '../header/header'
import CreateTodo from '../pages/create-todo/todo.home'
import PrivateRoute from '../../routing/privateRoute'

export default function Layout() {
  return (
    <div>
        <Header/>
        <CreateTodo/>
    </div>
  )
}

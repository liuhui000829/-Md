import React, { Component } from 'react'

import Item from '../Item'

import "./index.css"
export default class List extends Component {
  render() {
   
    let { todo } = this.props;
    return (
      <ul className="todo-main">
        {todo.map(item => {
          console.log(item)
          
          return <Item key={item.id} {...item} />
        })}

      </ul>
    )
  }
}

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { add, del, addElement } from '../slices/concatSlice'
import { decrement, increment } from '../slices/counterSlice'
import { set } from '../slices/answerSlice'

export function ComponentB() {
  const str = useSelector((state) => state.concat.value)
  const answer = useSelector((state) => state.answer.value)
  const dispatch = useDispatch()
  

  return (
      <div>
        <button
          onClick={() => dispatch(add())}
        >
          Add
        </button>
        <button
          onClick={() => dispatch(addElement('K'))}
        >Add K</button>                  
        <span>{str}</span>
        <button
          onClick={() => dispatch(del())}
        >
                  Delete
        </button>
        <button
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          onClick={() => dispatch(set({name:'juan', surname:'diez'}))}
        >
          Show name
        </button>        
        <span>{answer.name}</span>
        <span>{answer.surname}</span>
      </div>

  )
}
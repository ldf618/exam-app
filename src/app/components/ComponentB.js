import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { add, del } from '../slices/concatSlice'
import { decrement, increment } from '../slices/counterSlice'

export function ComponentB() {
  const str = useSelector((state) => state.concat.value)
  const dispatch = useDispatch()
  

  return (
      <div>
        <button
          onClick={() => dispatch(add())}
        >
          Add
        </button>
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
      </div>

  )
}
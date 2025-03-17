import React from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { BsFillTrashFill } from 'react-icons/bs'

const Todo = ({task, deleteTodo, editTodo}) => {
  return (
    <div className='flex justify-between items-center bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded-md mb-2 w-full shadow-sm'>
      <p className='font-primary'>{task.task}</p>
      <div className='flex items-center gap-x-4'>
        <AiFillEdit className='text-xl cursor-pointer text-blue-500' onClick={() => editTodo(task.id)} />
        <BsFillTrashFill className='text-xl cursor-pointer text-red-500' onClick={() => deleteTodo(task.id)}/>
      </div>
    </div>
  )
}

export default Todo

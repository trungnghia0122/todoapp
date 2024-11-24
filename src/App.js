import "./App.css"
import { useState } from "react"
import { MdModeEdit } from "react-icons/md"
import { FaTrashAlt } from "react-icons/fa"

export default function App() {
  const [todos, setToDos] = useState([])
  const [completed, setCompleted] = useState([])
  const [currentTodo, setCurrentTodo] = useState("")
  const [isEditActive, setIsEditActive] = useState(false)
  const [todoToEdit, setTodoToEdit] = useState(null)

  function handleClick() {
    if (currentTodo.length < 1) {
      return
    }
    const newTodoList = [...todos]
    newTodoList.push(currentTodo)
    setToDos(newTodoList)
    setCurrentTodo("")
  }

  function handleDelete(indexToRemove) {
    const newTodoList = todos.filter((_, index) => index !== indexToRemove)
    setToDos(newTodoList)
  }

  function handleEdit(todo, index) {
    setTodoToEdit({ text: todo, index: index })
    setIsEditActive(true)
  }

  function handleComplete(index) {
    setCompleted([...completed, todos[index]])
    handleDelete(index)
  }

  function handleCompleteDelete(indexToRemove) {
    const newCompletedList = completed.filter(
      (_, index) => index !== indexToRemove
    )
    setCompleted(newCompletedList)
  }

  return (
    <div className='container'>
      <div className={`App ${isEditActive ? "blur" : ""}`}>
        <h1>To Do List</h1>
        <div>
          <div className='input-box'>
            <input
              className='enter-todo-box'
              type='text'
              placeholder='e.g solve 5 leet code problems'
              onChange={(event) => setCurrentTodo(event.target.value)}
              value={currentTodo}
            />
            <button onClick={handleClick} className='add-button'>
              +
            </button>
          </div>
          <div className='list-box'>
            <ol className='list'>
              {todos.map((todo, index) => (
                <div key={index} className='list-item'>
                  <div className='checkbox-container'>
                    <input
                      className='checkbox'
                      type='checkbox'
                      onClick={() => {
                        handleComplete(index)
                      }}
                    />
                    <li>{todo}</li>
                  </div>

                  <div className='edit-delete-container'>
                    <button
                      className='edit-button'
                      onClick={() => handleEdit(todo, index)}
                    >
                      <MdModeEdit />
                    </button>
                    <button
                      className='delete-button'
                      onClick={() => handleDelete(index)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <div style={{ paddingTop: "80px" }} className={`App`}>
        <h1>Completed:</h1>

        <div className='list-box'>
          <ol className='list'>
            {completed.map((todo, index) => (
              <div key={index} className='list-item'>
                <li>{todo}</li>

                <button
                  className='delete-button'
                  onClick={() => handleCompleteDelete(index)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </ol>
        </div>
      </div>
      {isEditActive && (
        <>
          <div className='modal'>
            <h1 className='edit-header'>Edit Current Todo:</h1>
            <div className='modal-text'>
              <input
                type='text'
                value={todoToEdit ? todoToEdit.text : ""}
                onChange={(event) =>
                  setTodoToEdit({ ...todoToEdit, text: event.target.value })
                }
              />
              <button
                onClick={() => {
                  const updatedTodos = [...todos]
                  updatedTodos[todoToEdit.index] = todoToEdit.text
                  setToDos(updatedTodos)
                  setTodoToEdit(null)
                  setIsEditActive(false)
                }}
                className='confirm-button'
              >
                Confirm
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

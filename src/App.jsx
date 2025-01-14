import { useState } from "react"
import Todo from "./components/Todo"
import Form from "./components/Form"
import FilterButton from "./components/FilterButton"
import { v4 as uuidv4 } from "uuid"

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
}
const FILTER_NAMES = Object.keys(FILTER_MAP)

function App({ taskData }) {
  const [filter, setFilter] = useState("All")
  const [tasks, setTasks] = useState(taskData)
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  function addTask(name) {
    const newTask = { id: `todo-${tasks.length}`, name, completed: false }
    setTasks([...tasks, newTask])
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id)
    setTasks(remainingTasks)
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName }
      }
      return task
    })
    setTasks(editedTaskList)
  }

  const taskList = tasks?.filter(FILTER_MAP[filter]).map((task) => {
    const key = uuidv4()
    return (
      <Todo
        key={key}
        deleteTask={deleteTask}
        toggleTaskCompleted={toggleTaskCompleted}
        editTask={editTask}
        {...task}
      />
    )
  })

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task"
  const headingText = `${taskList.length} ${tasksNoun} remaining`

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} editTask={editTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  )
}

export default App

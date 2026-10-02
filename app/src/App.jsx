import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import './App.css'

const seedTasks = [
  {  },

]

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const storedTasks = localStorage.getItem('s')
      return storedTasks ? JSON.parse(storedTasks) : seedTasks
    } catch (error) {
      console.warn('Could not load tasks from localStorage.', error)
      return seedTasks
    }
  })

  const [newTask, setNewTask] = useState(() => {
    try {
      return localStorage.getItem('n') ?? ''
    } catch (error) {
      console.warn('Could not load input value from localStorage.', error)
      return ''
    }
  })

  const [filter, setFilter] = useState(() => {
    try {
      return localStorage.getItem('f') ?? 'all'
    } catch (error) {
      console.warn('Could not load filter value from localStorage.', error)
      return 'all'
    }
  })


  const filteredTasks = useMemo(() => {
    if (filter === 'active') {
      return tasks.filter((task) => !task.done)
    }

    if (filter === 'completed') {
      return tasks.filter((task) => task.done)
    }

    return tasks
  }, [filter, tasks])

  const remainingTasks = tasks.filter((task) => !task.done).length
  const completedTasks = tasks.length - remainingTasks

  const addTask = (event) => {
    event.preventDefault()

    const trimmed = newTask.trim()
    if (!trimmed) return

    setTasks((currentTasks) => [
      { id: Date.now() + Math.random(), text: trimmed, done: false },
      ...currentTasks,
    ])
    setNewTask('')
  }

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    )
  }

  const deleteTask = (id) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
  }

  const clearCompleted = () => {
    setTasks((currentTasks) => currentTasks.filter((task) => !task.done))
  }

  useEffect(() => {
    try {
      // localStorage accepts only strings, so arrays and objects must be serialized.
      localStorage.setItem('s', JSON.stringify(tasks))
      localStorage.setItem('n', newTask)
      localStorage.setItem('f', filter)
    } catch (error) {
      console.warn('localStorage is unavailable or full; the app will still work without persisting.', error)
    }
  }, [tasks, newTask, filter])

  return (
    <div className="todo-shell">
      <div className="todo-bg-blur one" />
      <div className="todo-bg-blur two" />

      <main className="todo-app">
        <header className="app-header">
          <div>
            <p className="eyebrow">Productivity</p>
            <h1>Tasks :</h1>
          </div>

          <div className="status-pill">
            <span className="status-dot" />
            {remainingTasks} left
          </div>
        </header>

        <section className="summary-grid" aria-label="Task summary">
          <article className="summary-card accent">
            <span>Total</span>
            <strong>{tasks.length}</strong>
          </article>
          <article className="summary-card">
            <span>Done</span>
            <strong>{completedTasks}</strong>
          </article>
          <article className="summary-card">
            <span>Pending</span>
            <strong>{remainingTasks}</strong>
          </article>
        </section>

        <form className="task-form" onSubmit={addTask}>
          <input
            type="text"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="Add a new task..."
            aria-label="Add new task"
          />
          <button type="submit" className="adding">
            Add
          </button>
        </form>

        <div className="toolbar">
          <div className="filters" aria-label="Task filters">
            {['all', 'active', 'completed'].map((option) => (
              <button
                key={option}
                type="button"
                className={filter === option ? 'active' : ''}
                onClick={() => setFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {completedTasks > 0 && (
            <button type="button" className="clear-btn" onClick={clearCompleted}>
              Clear completed
            </button>
          )}
        </div>

        <ul className="task-list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <li key={task.id} className={`task-item ${task.done ? 'done' : ''}`}>
                <button
                  type="button"
                  className={task.done ? 'check-btn-done' : 'check-btn'}
                  onClick={() => toggleTask(task.id)}
                  aria-label={task.done ? 'Mark task as incomplete' : 'Mark task as complete'}
                >
                  {task.done ? '✓' : ''}
                </button>

                <span className="task-text">{task.text}</span>

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.text}`}
                >
                  <span className="delete-btn-x">×</span>
                </button>
              </li>
            ))
          ) : (
            <li className="empty-state">
              <EmptyStatePlanet className='planet-loader-x' aria-label="Loading tasks">
                <div className="planet-loader">
                  {Array.from({ length: 9 }, (_, index) => (
                    <div
                      key={index}
                      className={`sphere sphere${index + 1}`}
                      style={{ '--rot': index, '--rotY': index + 1 }}
                    />
                  ))}
                </div>
                <p>Enjoy The Journey.</p>
              </EmptyStatePlanet>
            </li>
          )}
        </ul>
      </main>
    </div>
  )
}

const EmptyStatePlanet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 14px 0;

  .planet-loader {
    position: relative;
    width: 160px;
    height: 160px;
    transform-style: preserve-3d;
    animation: rotatePlanet 8s linear infinite;
  }

  .sphere {
    position: absolute;
    inset: 0;
    transform: rotate(calc(var(--rot) * 40deg));
    transform-style: preserve-3d;
  }

  .sphere::before {
    content: '';
    position: absolute;
    inset: 18%;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(108, 189, 255, 0.4) 25%, rgba(59, 130, 246, 0.25) 45%, rgba(15, 23, 42, 0.8) 100%);
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow: 0 0 18px rgba(96, 165, 250, 0.4), inset 0 0 18px rgba(147, 197, 253, 0.3);
    transform: rotateY(calc(var(--rotY) * 40deg));
  }

  .sphere:nth-child(odd)::before {
    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(244, 114, 182, 0.5) 24%, rgba(168, 85, 247, 0.3) 50%, rgba(15, 23, 42, 0.8) 100%);
  }

  p {
    margin: 0;
    color: #f5d57a;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-size: 0.7rem;
  }

  @keyframes rotatePlanet {
    0% {
      transform: rotateX(70deg) rotateY(0deg);
    }
    100% {
      transform: rotateX(70deg) rotateY(360deg);
    }
  }
`

export default App



























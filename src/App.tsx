import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Welcome to Your Website</h1>
        <p>Ready for AWS Amplify Deployment</p>
      </header>
      
      <main className="app-main">
        <div className="card">
          <h2>Getting Started</h2>
          <p>Edit <code>src/App.tsx</code> and save to test HMR</p>
          <button onClick={() => setCount((count) => count + 1)}>
            Count is {count}
          </button>
        </div>

        <div className="card">
          <h2>Learn More</h2>
          <p>Check out the following resources:</p>
          <ul>
            <li><a href="https://vitejs.dev" target="_blank" rel="noreferrer">Vite Documentation</a></li>
            <li><a href="https://react.dev" target="_blank" rel="noreferrer">React Documentation</a></li>
            <li><a href="https://docs.amplify.aws" target="_blank" rel="noreferrer">AWS Amplify Documentation</a></li>
          </ul>
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with React + Vite + TypeScript</p>
      </footer>
    </div>
  )
}

export default App

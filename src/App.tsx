import logo from './assets/img/aiko.png'
import './App.css'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
      <div>
         <img src={logo} className="logo" alt="Vite logo" />
      </div>
      <h1>Hello Word teste</h1>
      <Dashboard />
    </>
  )
}

export default App

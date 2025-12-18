
import MainContent from './components/main/main'
import {Route,  Routes} from "react-router-dom"
import './index.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainContent/>}/>
    </Routes>
  )
}

export default App

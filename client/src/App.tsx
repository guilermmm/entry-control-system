import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './components/auth_context'
import Home from './pages/Home'
import Login from './pages/Login'
import Visits from './pages/Visits'
import './styles/globals.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/visits" element={<Visits />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

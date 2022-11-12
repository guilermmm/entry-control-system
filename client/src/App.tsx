import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './components/auth_context'
import AdminArea from './components/admin_area'
import Attendant from './pages/Attendant'
import Employee from './pages/Employee'
import Home from './pages/Home'
import Login from './pages/Login'
import './styles/globals.css'
import Admin from './pages/Admin'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/attendant" element={<Attendant />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

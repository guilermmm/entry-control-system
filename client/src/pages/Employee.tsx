import { Navigate } from 'react-router-dom'
import { useAuth } from '../components/auth_context'
import Container from '../components/container'
import NavBar from '../components/navbar'

const Employee = () => {
  const { token, user } = useAuth()

  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    <Container>
      {/* <AdminNavBar /> */}
      <div className="h-screen-4/5 flex max-w-96">
        <aside className="h-full bg-white w-2/6 mx-4 rounded ">sidebar</aside>
        <main className="bg-white overflow-auto w-4/6 mx-4 rounded">
          main content
        </main>
      </div>
    </Container>
  )
}

export default Employee

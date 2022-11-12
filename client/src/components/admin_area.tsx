import { Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './auth_context'
import Container from './container'
import NavBar, { NavLink } from './navbar'
import React from 'react'

const AdminArea = ({ children }: { children: React.ReactNode }) => {
  const selected = useLocation().pathname
  return (
    <Container>
      <NavBar />
      {/* <NavLink selected={selected} href="/admin/units">
          Unidades
        </NavLink>
        <NavLink selected={selected} href="/admin/sectors">
          Setores
        </NavLink>
        <NavLink selected={selected} href="/admin/employees">
          Funcionários
        </NavLink> */}
      <div className="h-screen-4/5 flex w-3/4 mx-auto">
        <main className="bg-white overflow-auto mx-4 rounded w-full border-2 border-primary-default">
          {children}
        </main>
      </div>
    </Container>
  )
}

export default AdminArea

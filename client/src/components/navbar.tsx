import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from './auth_context'

const NavBar = () => {
  const { saveToken, user } = useAuth()

  const handleLogOut = () => {
    saveToken(null)
  }

  return (
    <header className="flex justify-center w-full text-center">
      <div className="w-fit bg-white py-4 px-8 m-4 rounded border-2 border-primary-default">
        <nav className="flex space-x-10">
          {/* {children} */}
          <div className="flex">
            <div>Logado como: {user?.name}</div>
            <button
              className="font-bold hover:text-primary-default pl-2"
              onClick={handleLogOut}
            >
              Log out
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}

interface NavLinkProps {
  selected: string | null
  href: string
  children: React.ReactNode
}

export const NavLink = ({ selected, href, children }: NavLinkProps) => {
  const selectedSeg = selected !== null ? selected : ''
  const active = selectedSeg === href

  return (
    <Link
      to={href}
      className={
        active ? 'underline font-bold' : '' + ' hover:text-primary-default'
      }
    >
      {children}
    </Link>
  )
}

export default NavBar

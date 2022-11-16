import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../components/auth_context'
import MainArea from '../components/main_area'
import { getSector, Sector } from '../services/sector'
import { getUnit, Unit } from '../services/unit'
import { getUser } from '../services/user'
import { getVisits, updateVisit, Visit } from '../services/visit'
import { getVisitors, Visitor } from '../services/visitor'
import { getDate, getHour } from '../util/functions'

const Employee = () => {
  const { token, user } = useAuth()
  const navigate = useNavigate()

  const [unit, setUnit] = useState(null as Unit | null)
  const [visits, setVisits] = useState([] as Visit[])
  const [visitors, setVisitors] = useState([] as Visitor[])
  const [sector, setSector] = useState(null as Sector | null)

  useEffect(() => {
    if (user) {
      getUser(user.id).then(user => {
        if (user.permitLevel !== 'EMPLOYEE') {
          navigate('/')
        }
        const { unitId } = user

        getUnit(unitId!).then(unit => {
          setUnit(unit)
          getSector(user.sectorId!).then(sector => {
            setSector(sector)
          })
          getVisits().then(visits => {
            setVisits(visits.filter(visit => visit.unitId === user.unitId))
            console.log(visits)
          })
          getVisitors().then(visitors => {
            setVisitors(visitors)
          })
        })
      })
    }
  }, [])

  if (!token) {
    return <Navigate to="/login" />
  }

  const handleFinalizeVisit = async (visit: Visit, event: React.MouseEvent) => {
    event.preventDefault()
    try {
      await updateVisit(visit.id, {
        userId: user?.id,
        sectorId: sector?.id,
        unitId: unit?.id,
        finalized: true,
      })
      alert('Visita finalizada com sucesso!')
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <MainArea>
      <div className="w-full p-4">
        <h1 className="text-2xl font-bold border-b-2 border-primary-default">
          Visitas aguardando - Unidade {unit?.name} - Setor {sector?.name}
        </h1>
        <table className="w-full mt-2">
          <thead>
            <tr>
              <th>Visitante</th>
              <th>Funcionário</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Finalizar</th>
            </tr>
          </thead>
          <tbody>
            {visits
              .filter(visit => !visit.finalized)
              .map(visit => (
                <tr key={visit.id}>
                  <td className="text-center">
                    {
                      visitors.filter(
                        visitor => visitor.id === visit.visitorId,
                      )[0]?.name
                    }
                  </td>
                  <td className="text-center">
                    {visit.userId === user?.id ? user.name : '-'}
                  </td>
                  <td className="text-center">{getDate(visit.createdAt)}</td>
                  <td className="text-center">{getHour(visit.createdAt)}</td>
                  <td className="text-center">
                    <button
                      onClick={e => handleFinalizeVisit(visit, e)}
                      className="bg-primary-default rounded-md mt-2 mb-4 py-2 w-40 text-white"
                    >
                      Finalizar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </MainArea>
  )
}

export default Employee

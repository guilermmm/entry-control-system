import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../components/auth_context'
import MainArea from '../components/main_area'
import VisitorModal from '../components/visitor_modal'
import VisitModal from '../components/visit_modal'
import { getSectors, Sector } from '../services/sector'
import { getUnit, Unit } from '../services/unit'
import { getUser, getUsers, User } from '../services/user'
import { getVisits, Visit } from '../services/visit'
import { getVisitors, Visitor } from '../services/visitor'

const Attendant = () => {
  const { token, user } = useAuth()
  const navigate = useNavigate()

  const [unit, setUnit] = useState(null as Unit | null)
  const [sectors, setSectors] = useState([] as Sector[])
  const [employees, setEmployees] = useState([] as User[])
  const [visits, setVisits] = useState([] as Visit[])
  const [visitors, setVisitors] = useState([] as Visitor[])
  const [visitModal, setVisitModal] = useState(false)
  const [visitorModal, setVisitorModal] = useState(false)

  useEffect(() => {
    if (user) {
      getUser(user.id).then(user => {
        if (user.permitLevel !== 'ATTENDANT') {
          navigate('/')
        }
        const { unitId } = user

        getUnit(unitId!).then(unit => {
          setUnit(unit)
          getSectors().then(sectors => {
            setSectors(sectors.filter(sector => sector.unitId === unitId))
          })
          getUsers().then(users => {
            setEmployees(users.filter(user => user.unitId === unit?.id))
          })
          getVisits().then(visits => {
            setVisits(visits.filter(visit => visit.unitId === user.unitId))
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

  return (
    <MainArea>
      <div className="w-full p-4">
        <div className="flex justify-center gap-10">
          <button
            className="bg-primary-default rounded-md mt-2 mb-4 py-2 w-40 text-white"
            onClick={() => setVisitModal(true)}
          >
            Nova Visita
          </button>
          <button
            className="bg-primary-default rounded-md mt-2 mb-4 py-2 w-40 text-white"
            onClick={() => setVisitorModal(true)}
          >
            Novo Visitante
          </button>
        </div>
        <h1 className="text-2xl font-bold border-b-2 border-primary-default">
          Visitas da unidade - {unit?.name}
        </h1>
        <div className="flex space-x-10 flex-wrap pt-4">
          <div className="border-primary-default border-2 rounded p-2 bg-gray-200 min-w-1/6 mb-4">
            <h2 className="font-bold">Ativas sem setor:</h2>
            <table>
              <thead>
                <tr>
                  <th className="pr-4">ID</th>
                  <th className="pr-4">Visitante</th>
                </tr>
              </thead>
              <tbody>
                {visits
                  .filter(visit => !visit.sectorId)
                  .map(visit => (
                    <tr key={visit.id}>
                      <td className="pr-2">{visit.id}</td>
                      <td>
                        {
                          visitors.filter(
                            visitor => visitor.id === visit.visitorId,
                          )[0]?.name
                        }
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {sectors.map(sector => (
            <div
              key={sector.id}
              className="border-primary-default border-2 rounded p-2 bg-gray-200 min-w-1/6"
            >
              <h2 className="font-bold">{sector.name}:</h2>
              <table>
                <thead>
                  <tr>
                    <th className="pr-4">ID</th>
                    <th className="pr-4">Visitante</th>
                    <th className="pr-4">Funcionário</th>
                    <th className="pr-4">Finalizado</th>
                  </tr>
                </thead>
                <tbody>
                  {visits
                    .filter(visit => visit.sectorId === sector.id)
                    .map(visit => (
                      <tr key={visit.id}>
                        <td className="text-center pr-4">{visit.visitorId}</td>
                        <td className="text-center pr-4">
                          {
                            visitors.filter(
                              visitor => visitor.id === visit.visitorId,
                            )[0]?.name
                          }
                        </td>
                        <td className="text-center pr-4">
                          {
                            employees.filter(
                              employee => employee.id === visit.userId,
                            )[0]?.name
                          }
                        </td>
                        <td className="text-center">
                          {visit.finalized ? (
                            <span className="text-green-500">Sim</span>
                          ) : (
                            <span className="text-red-500">Não</span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {visitModal && (
          <VisitModal
            employees={employees}
            sectors={sectors}
            unit={unit}
            onClose={() => setVisitModal(false)}
          />
        )}

        {visitorModal && (
          <VisitorModal onClose={() => setVisitorModal(false)} />
        )}
      </div>
    </MainArea>
  )
}

export default Attendant

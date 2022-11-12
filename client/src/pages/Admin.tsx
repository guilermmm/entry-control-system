import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import AdminArea from '../components/admin_area'
import { useAuth } from '../components/auth_context'
import EmployeeModal from '../components/employee_modal'
import SectorModal from '../components/sector_modal'
import UnitModal from '../components/unit_modal'
import { getSectors, Sector } from '../services/sector'
import { getUnits, Unit } from '../services/unit'
import { getUsers, PermitLevel, User } from '../services/user'

const Admin = () => {
  const { token, user } = useAuth()
  const navigate = useNavigate()

  const [employees, setEmployees] = useState([] as User[])
  const [units, setUnits] = useState([] as Unit[])
  const [sectors, setSectors] = useState([] as Sector[])
  const [unitModal, setUnitModal] = useState(false)
  const [sectorModal, setSectorModal] = useState(false)
  const [employeeModal, setEmployeeModal] = useState(false)

  useEffect(() => {
    if (user) {
      getUsers().then(user => {
        const thisUser = user.find(user => user.id === user.id)
        if (thisUser?.permitLevel !== PermitLevel.ADMIN) {
          navigate('/')
        }

        setEmployees(
          user.filter(user => user.permitLevel !== PermitLevel.ADMIN),
        )

        console.log(employees)
      })
    }
    getUnits().then(units => setUnits(units))
    getSectors().then(sectors => setSectors(sectors))
  }, [])

  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    <AdminArea>
      <div className="w-full p-4">
        <div className="flex justify-center space-x-10">
          <button
            className="bg-primary-default rounded-md mt-2 mb-4 py-2 w-40 text-white"
            onClick={() => setUnitModal(true)}
          >
            Nova Unidade
          </button>
          <button
            className="bg-primary-default rounded-md mt-2 mb-4 py-2 w-40 text-white"
            onClick={() => setSectorModal(true)}
          >
            Novo Setor
          </button>
          <button
            className="bg-primary-default rounded-md mt-2 mb-4 py-2 w-40 text-white"
            onClick={() => setEmployeeModal(true)}
          >
            Novo Funcionário
          </button>
        </div>
        <h1 className="text-2xl font-bold border-b-2 border-primary-default">
          Unidades:
        </h1>
        <div className="flex space-x-10 flex-wrap">
          {units.map(unit => (
            <div key={unit.id}>
              <h2 className="text-xl font-bold">{unit.name}:</h2>
              <h3>Setores:</h3>
              {sectors
                .filter(sector => sector.unitId === unit.id)
                .map(sector => (
                  <div key={sector.id}>
                    <h4 className="font-bold">{sector.name}</h4>
                    <h5>Funcionários:</h5>
                    <table>
                      <tbody>
                        {employees
                          .filter(employee => employee.sectorId === sector.id)
                          .map(employee => (
                            <tr key={employee.id}>
                              <td className="pr-4">- {employee.name}</td>
                              <td>
                                {employee.permitLevel === PermitLevel.ATTENDANT
                                  ? 'Atendente'
                                  : 'Funcionário'}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ))}
            </div>
          ))}
        </div>
        {unitModal && <UnitModal onClose={() => setUnitModal(false)} />}

        {sectorModal && (
          <SectorModal onClose={() => setSectorModal(false)} units={units} />
        )}

        {employeeModal && (
          <EmployeeModal
            onClose={() => setEmployeeModal(false)}
            units={units}
            sectors={sectors}
          />
        )}
      </div>
    </AdminArea>
  )
}

export default Admin

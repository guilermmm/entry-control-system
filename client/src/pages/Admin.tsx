import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import MainArea from '../components/main_area'
import { useAuth } from '../components/auth_context'
import EmployeeModal from '../components/employee_modal'
import SectorModal from '../components/sector_modal'
import UnitModal from '../components/unit_modal'
import { getSectors, Sector } from '../services/sector'
import { getUnits, Unit } from '../services/unit'
import { getUsers, PermitLevel, User } from '../services/user'
import EditModal from '../components/edit_modal'

const Admin = () => {
  const { token, user } = useAuth()
  const navigate = useNavigate()

  const [employees, setEmployees] = useState([] as User[])
  const [units, setUnits] = useState([] as Unit[])
  const [sectors, setSectors] = useState([] as Sector[])
  const [unitModal, setUnitModal] = useState(false)
  const [sectorModal, setSectorModal] = useState(false)
  const [employeeModal, setEmployeeModal] = useState(false)
  const [editModal, setEditModal] = useState(false)

  useEffect(() => {
    if (user) {
      getUsers().then(users => {
        const thisUser = users.find(userArr => userArr.id === user.id)
        if (thisUser?.permitLevel !== PermitLevel.ADMIN) {
          navigate('/')
        }

        setEmployees(
          users.filter(user => user.permitLevel !== PermitLevel.ADMIN),
        )
      })
    }
    getUnits().then(units => setUnits(units))
    getSectors().then(sectors => setSectors(sectors))
  }, [])

  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    <MainArea>
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
          <button
            className="bg-primary-default rounded-md mt-2 mb-4 py-2 w-40 text-white"
            onClick={() => setEditModal(true)}
          >
            Editar
          </button>
        </div>
        <h1 className="text-2xl font-bold border-b-2 border-primary-default">
          Unidades:
        </h1>
        <div className="flex flex-wrap pt-6 gap-4 justify-center">
          {units.map(unit => (
            <div
              key={unit.id}
              className="w-1/6 border-primary-default border-2 rounded p-2 bg-gray-200 mb-4"
            >
              <h2 className="text-xl font-bold">{unit.name}:</h2>
              <h3>Atendentes:</h3>
              {employees
                .filter(
                  employee =>
                    employee.unitId === unit.id &&
                    employee.permitLevel === PermitLevel.ATTENDANT,
                )
                .map(employee => (
                  <p key={employee.id}> - {employee.name}</p>
                ))}
              <h3>Setores:</h3>
              {sectors
                .filter(sector => sector.unitId === unit.id)
                .map(sector => (
                  <div key={sector.id}>
                    <h4 className="font-bold">{sector.name}</h4>
                    <h5>Funcionários:</h5>

                    <div>
                      {employees
                        .filter(
                          employee =>
                            employee.sectorId === sector.id &&
                            employee.permitLevel === PermitLevel.EMPLOYEE,
                        )
                        .map(employee => (
                          <div key={employee.id}>
                            <div className="pr-4">- {employee.name}</div>
                          </div>
                        ))}
                    </div>
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

        {editModal && (
          <EditModal
            onClose={() => setEditModal(false)}
            units={units}
            sectors={sectors}
            users={employees}
          />
        )}
      </div>
    </MainArea>
  )
}

export default Admin

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/auth'
import { Sector } from '../services/sector'
import { Unit } from '../services/unit'
import { PermitLevel } from '../services/user'
import { validateCharLimit } from '../util/functions'
import Modal from './modal'

interface Props {
  onClose: () => void
  units: Unit[]
  sectors: Sector[]
}

const EmployeeModal = ({ sectors, units, onClose }: Props) => {
  const navigate = useNavigate()

  const [employeeName, setEmployeeName] = useState('')
  const [employeeRegister, setEmployeeRegister] = useState('')
  const [employeePassword, setEmployeePassword] = useState('')
  const [employeeSectorId, setEmployeeSectorId] = useState(0)
  const [employeeUnitId, setEmployeeUnitId] = useState(0)
  const [employeePermitLevel, setEmployeePermitLevel] = useState('')
  const [unitField, setUnitField] = useState(false)
  const [sectorField, setSectorField] = useState(false)

  useEffect(() => {
    if (
      employeePermitLevel === PermitLevel.ADMIN ||
      employeePermitLevel === ''
    ) {
      setUnitField(false)
      setSectorField(false)
    } else {
      setUnitField(true)
    }
    employeePermitLevel === PermitLevel.EMPLOYEE
      ? setSectorField(true)
      : setSectorField(false)
  }, [employeePermitLevel])

  const handleCreateEmployee = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      if (validateCharLimit(employeeName)) {
        if (
          employeePermitLevel === PermitLevel.ATTENDANT &&
          employeeUnitId === 0
        ) {
          alert('Selecione uma unidade')
          throw new Error('Selecione uma unidade')
        }
        console.log(employeePermitLevel, employeeUnitId, employeeSectorId)

        if (
          employeePermitLevel === PermitLevel.EMPLOYEE &&
          (employeeUnitId === 0 || employeeSectorId === 0)
        ) {
          console.log(employeePermitLevel, employeeUnitId, employeeSectorId)

          alert('Selecione um setor e uma unidade')
          throw new Error('Selecione um setor')
        }

        await register({
          name: employeeName,
          register: employeeRegister,
          password: employeePassword,
          sectorId: employeeSectorId === 0 ? undefined : employeeSectorId,
          unitId: employeeUnitId === 0 ? undefined : employeeUnitId,
          permitLevel: employeePermitLevel,
        })
        alert('Funcionário criado com sucesso!')
        navigate('/')
      } else alert('O nome do funcionário deve conter no máximo 30 caracteres')
    } catch (error) {
      alert('Funcionário inválido')
      console.error(error)
    }
  }

  return (
    <Modal onClose={onClose}>
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold border-b-4 border-primary-default w-fit">
          Criar novo funcionário
        </h1>
      </div>
      <form className="flex flex-col w-64 text-2xl items-center mx-auto pr-3">
        <input
          value={employeeName}
          onChange={event => setEmployeeName(event.target.value)}
          type="text"
          placeholder="Nome"
          className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
        />
        <input
          value={employeeRegister}
          onChange={event => setEmployeeRegister(event.target.value)}
          type="text"
          placeholder="Registro"
          className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
        />
        <input
          value={employeePassword}
          onChange={event => setEmployeePassword(event.target.value)}
          type="password"
          placeholder="Senha"
          className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
        />

        <select
          value={employeePermitLevel}
          onChange={event => setEmployeePermitLevel(event.target.value)}
          className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
        >
          <option value="">Permissão</option>
          <option value={PermitLevel.ADMIN}>Administrador</option>
          <option value={PermitLevel.ATTENDANT}>Atendente</option>
          <option value={PermitLevel.EMPLOYEE}>Funcionário</option>
        </select>

        {unitField && (
          <select
            value={employeeUnitId}
            onChange={e => setEmployeeUnitId(Number(e.target.value))}
            className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
          >
            <option value={0}>Selecione a unidade</option>
            {units.map(unit => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>
        )}

        {sectorField && (
          <select
            value={employeeSectorId}
            onChange={event => setEmployeeSectorId(Number(event.target.value))}
            className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
          >
            <option value={0}>Selecione o setor</option>
            {sectors
              .filter(sector => sector.unitId === employeeUnitId)
              .map(sector => (
                <option key={sector.id} value={sector.id}>
                  {sector.name}
                </option>
              ))}
          </select>
        )}

        <button
          onClick={handleCreateEmployee}
          className="bg-primary-default rounded-md mt-2 mb-4 py-2 w-56 text-white"
        >
          Criar
        </button>
      </form>
    </Modal>
  )
}

export default EmployeeModal

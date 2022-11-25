import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sector, updateSector } from '../services/sector'
import { Unit, updateUnit } from '../services/unit'
import { PermitLevel, updateUser, User } from '../services/user'
import { validateCharLimit } from '../util/functions'
import Modal from './modal'

interface Props {
  onClose: () => void
  units: Unit[]
  sectors: Sector[]
  users: User[]
}

const EditModal = ({ onClose, units, sectors, users }: Props) => {
  const navigate = useNavigate()

  const [type, setType] = useState(0)
  const [name, setName] = useState('')
  const [register, setRegister] = useState('')
  const [password, setPassword] = useState('')
  const [permitLevel, setPermitLevel] = useState('')
  const [sectorId, setSectorId] = useState(0)
  const [unitId, setUnitId] = useState(0)
  const [userId, setUserId] = useState(0)

  const handleUpdateUnit = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      if (validateCharLimit(name)) {
        await updateUnit(unitId, { name })
        alert('Unidade atualizada com sucesso')
        onClose()
        navigate('/')
      } else {
        alert('Nome inválido')
        throw new Error('Nome inválido')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateSector = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      if (validateCharLimit(name)) {
        await updateSector(sectorId, { name })
        onClose()
        navigate('/')
        alert('Setor atualizado com sucesso')
      } else {
        alert('Nome inválido')
        throw new Error('Nome inválido')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateUser = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      if (unitId && !sectorId) {
        alert('Selecione um setor')
        throw new Error('Selecione um setor')
      }
      if (validateCharLimit(name)) {
        const selectedUser = users.filter(user => user.id === userId)[0]
        await updateUser(userId, {
          name: name ? name : undefined,
          register: register ? register : undefined,
          password: password ? password : undefined,
          permitLevel: permitLevel ? permitLevel : selectedUser.permitLevel,
          sectorId: sectorId ? sectorId : undefined,
          unitId: unitId ? unitId : undefined,
        })
        alert('Usuário atualizado com sucesso')
        onClose()
        navigate('/')
      } else {
        alert('Nome inválido')
        throw new Error('Nome inválido')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Modal onClose={onClose}>
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold border-b-4 border-primary-default w-fit">
          Criar nova unidade
        </h1>
      </div>
      <form className="flex flex-col w-64 text-2xl items-center mx-auto pr-3">
        <select
          value={type}
          onChange={event => setType(Number(event.target.value))}
          className="my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
        >
          <option value={0}>Selecione o que deseja editar</option>
          <option value={1}>Unidade</option>
          <option value={2}>Setor</option>
          <option value={3}>Usuário</option>
        </select>

        {type === 1 && (
          <div>
            <select
              onChange={event => {
                console.log(event.target.value)
                setUnitId(Number(event.target.value))
              }}
              className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
            >
              <option value={0}>Selecione a unidade</option>
              {units.map(unit => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
            <input
              value={name}
              onChange={event => setName(event.target.value)}
              type="text"
              placeholder="Novo nome"
              className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
            />
          </div>
        )}

        {type === 2 && (
          <div>
            <select
              onChange={event => setSectorId(Number(event.target.value))}
              className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
            >
              <option value={0}>Selecione o setor</option>
              {sectors.map(sector => (
                <option key={sector.id} value={sector.id}>
                  {sector.name}
                </option>
              ))}
            </select>
            <input
              value={name}
              onChange={event => setName(event.target.value)}
              type="text"
              placeholder="Novo nome"
              className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
            />
          </div>
        )}

        {type === 3 && (
          <div>
            <select
              onChange={event => setUserId(Number(event.target.value))}
              className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
            >
              <option value={0}>Selecione o usuário</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <input
              value={name}
              onChange={event => setName(event.target.value)}
              type="text"
              placeholder="Novo nome"
              className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
            />

            <input
              value={register}
              onChange={event => setRegister(event.target.value)}
              type="text"
              placeholder="Novo registro"
              className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
            />

            <input
              value={password}
              onChange={event => setPassword(event.target.value)}
              type="password"
              placeholder="Nova senha"
              className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
            />

            <select
              onChange={event => setPermitLevel(event.target.value)}
              className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
            >
              <option value={0}>Selecione a permissão</option>
              <option value={PermitLevel.ADMIN}>Administrador</option>
              <option value={PermitLevel.ATTENDANT}>Atendente</option>
              <option value={PermitLevel.EMPLOYEE}>Funcionário</option>
            </select>

            <select
              onChange={event => setUnitId(Number(event.target.value))}
              className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
            >
              <option value={0}>Selecione a unidade</option>

              {units.map(unit => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>

            <select
              onChange={event => setSectorId(Number(event.target.value))}
              className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
            >
              <option value={0}>Selecione o setor</option>
              {sectors
                .filter(sector => sector.unitId === unitId)
                .map(sector => (
                  <option key={sector.id} value={sector.id}>
                    {sector.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        <button
          onClick={
            type === 1
              ? handleUpdateUnit
              : type === 2
              ? handleUpdateSector
              : handleUpdateUser
          }
          className="bg-primary-default rounded-md mt-2 mb-4 py-2 w-56 text-white"
        >
          Editar
        </button>
      </form>
    </Modal>
  )
}

export default EditModal

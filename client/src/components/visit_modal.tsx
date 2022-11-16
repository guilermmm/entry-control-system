import React, { useEffect, useState } from 'react'
import Modal from './modal'
import { BiSearchAlt } from 'react-icons/bi'
import { Unit } from '../services/unit'
import { Sector } from '../services/sector'
import { User } from '../services/user'
import { validateCpf } from '../util/functions'
import { getVisitors } from '../services/visitor'
import { createVisit } from '../services/visit'
import { useNavigate } from 'react-router-dom'

interface Props {
  onClose: () => void
  unit: Unit | null
  sectors: Sector[]
  employees: User[]
}

const VisitModal = ({ onClose, unit, sectors, employees }: Props) => {
  const navigate = useNavigate()

  const [visitorId, setVisitorId] = useState(0)
  const [visitorCpf, setVisitorCpf] = useState('')
  const [visitorName, setVisitorName] = useState('')
  const [visitorRg, setVisitorRg] = useState('')
  const [visitorPhone, setVisitorPhone] = useState('')
  const [visitorPhoto, setVisitorPhoto] = useState('')
  const [visitSectorId, setVisitSectorId] = useState(0)
  const [visitEmployeeId, setVisitEmployeeId] = useState(0)
  const [fields, setFields] = useState(false)
  const disabled = true

  const visitUnitId = unit?.id

  const handleVisitorSearch = async (event: React.MouseEvent) => {
    event.preventDefault()
    if (validateCpf(visitorCpf)) {
      getVisitors({ cpf: visitorCpf }).then(visitors => {
        if (visitors[0]) {
          setVisitorId(visitors[0].id)
          setVisitorName(visitors[0].name)
          setVisitorRg(visitors[0].rg)
          setVisitorPhone(visitors[0].phone)
          setVisitorPhoto(visitors[0].photo)
          setFields(true)
          console.log(visitors)
        } else {
          alert('Visitante não encontrado')
        }
      })
    } else {
      alert('CPF inválido')
    }
  }

  const handleCreateVisit = async (event: React.MouseEvent) => {
    event.preventDefault()
    try {
      createVisit({
        visitorId: visitorId,
        userId: visitEmployeeId ? visitEmployeeId : undefined,
        sectorId: visitSectorId ? visitSectorId : undefined,
        unitId: visitUnitId,
      })
      alert('Visita criada com sucesso!')
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal onClose={onClose}>
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold border-b-4 border-primary-default w-fit">
          Registrar nova visita
        </h1>
      </div>
      <form className="flex flex-col w-3/4 text-2xl items-center mx-auto pr-3">
        <div className="flex items-center">
          <input
            value={visitorCpf}
            onChange={event => setVisitorCpf(event.target.value)}
            type="text"
            placeholder="Cpf"
            className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
          />
          <button onClick={handleVisitorSearch}>
            <BiSearchAlt />
          </button>
        </div>
        {fields && (
          <div className="flex flex-col justify-center items-center">
            <input
              disabled={disabled}
              value={visitorName}
              onChange={event => setVisitorName(event.target.value)}
              type="text"
              placeholder="Nome"
              className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
            />
            <div className="flex gap-8">
              <input
                disabled={disabled}
                value={visitorRg}
                onChange={event => setVisitorRg(event.target.value)}
                type="text"
                placeholder="Rg"
                className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
              />
              <input
                disabled={disabled}
                value={visitorPhone}
                onChange={event => setVisitorPhone(event.target.value)}
                type="text"
                placeholder="Telefone"
                className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
              />
            </div>
            <div className="flex gap-8 w-full">
              <img
                width="150px"
                height="150px"
                src={visitorPhoto}
                alt="https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                className=" my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
              />

              <div className="flex flex-col w-full">
                <select
                  value={visitSectorId}
                  onChange={event =>
                    setVisitSectorId(Number(event.target.value))
                  }
                  className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
                >
                  <option value={0}>Setor</option>
                  {sectors.map(sector => (
                    <option key={sector.id} value={sector.id}>
                      {sector.name}
                    </option>
                  ))}
                </select>

                <select
                  value={visitEmployeeId}
                  onChange={event =>
                    setVisitEmployeeId(Number(event.target.value))
                  }
                  className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
                >
                  <option value={0}>Funcionário</option>
                  {employees
                    .filter(employee => employee.sectorId === visitSectorId)
                    .map(employee => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleCreateVisit}
              className="bg-primary-default rounded-md mt-2 mb-4 py-2 w-56 text-white"
            >
              Registrar
            </button>
          </div>
        )}
      </form>
    </Modal>
  )
}

export default VisitModal

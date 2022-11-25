import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createVisitor } from '../services/visitor'
import {
  validateCharLimit,
  validateCpf,
  validatePhone,
  validateRg,
} from '../util/functions'
import Modal from './modal'

const VisitorModal = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate()

  const [visitorCpf, setVisitorCpf] = useState('')
  const [visitorName, setVisitorName] = useState('')
  const [visitorRg, setVisitorRg] = useState('')
  const [visitorPhone, setVisitorPhone] = useState('')
  const [visitorPhoto, setVisitorPhoto] = useState('')

  const handleCreateVisitor = async (event: React.MouseEvent) => {
    event.preventDefault()
    try {
      if (
        validateCpf(visitorCpf) &&
        validateRg(visitorRg) &&
        validatePhone(visitorPhone) &&
        validateCharLimit(visitorName, 50)
      ) {
        await createVisitor({
          cpf: visitorCpf,
          name: visitorName,
          rg: visitorRg,
          phone: visitorPhone,
          photo: visitorPhoto,
        })
        alert('Visitante criado com sucesso!')
        navigate('/')
      } else {
        alert('Nome, CPF, RG ou telefone inválido')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal onClose={onClose}>
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold border-b-4 border-primary-default w-fit">
          Registrar novo visitante
        </h1>
      </div>
      <form className="flex flex-col w-1/2 text-2xl items-center mx-auto pr-3">
        <input
          value={visitorName}
          onChange={event => setVisitorName(event.target.value)}
          type="text"
          placeholder="Nome"
          className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
        />
        <input
          value={visitorCpf}
          onChange={event => setVisitorCpf(event.target.value)}
          type="text"
          placeholder="CPF"
          className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
        />

        <input
          value={visitorRg}
          onChange={event => setVisitorRg(event.target.value)}
          type="text"
          placeholder="Rg"
          className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
        />

        <input
          value={visitorPhone}
          onChange={event => setVisitorPhone(event.target.value)}
          type="text"
          placeholder="Telefone"
          className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
        />

        <input
          value={visitorPhoto}
          onChange={event => setVisitorPhoto(event.target.value)}
          type="text"
          placeholder="Foto"
          className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
        />
        <button
          onClick={handleCreateVisitor}
          className="bg-primary-default rounded-md mt-2 mb-4 py-2 w-56 text-white"
        >
          Criar
        </button>
      </form>
    </Modal>
  )
}

export default VisitorModal

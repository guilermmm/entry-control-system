import React, { useState } from 'react'
import { createSector } from '../services/sector'
import { Unit } from '../services/unit'
import Modal from './modal'

interface Props {
  onClose: () => void
  units: Unit[]
}

const SectorModal = ({ units, onClose }: Props) => {
  const [sectorName, setSectorName] = useState('')
  const [sectorUnitId, setSectorUnitId] = useState(1)

  const handleCreateSector = async (event: React.MouseEvent) => {
    event.preventDefault()
    try {
      console.log(`name: ${sectorName}, unitId: ${sectorUnitId}`)
      const sector = await createSector({
        name: sectorName,
        unitId: sectorUnitId,
      })
      alert('Setor criado com sucesso!')
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal onClose={onClose}>
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold border-b-4 border-primary-default w-fit">
          Criar novo setor
        </h1>
      </div>
      <form className="flex flex-col w-64 text-2xl items-center mx-auto pr-3">
        <input
          value={sectorName}
          onChange={event => setSectorName(event.target.value)}
          type="text"
          placeholder="Nome"
          className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
        />

        <select
          value={sectorUnitId}
          onChange={event => setSectorUnitId(Number(event.target.value))}
          className="w-full my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
        >
          {units.map(unit => (
            <option key={unit.id} value={unit.id}>
              {unit.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleCreateSector}
          className="bg-primary-default rounded-md mt-2 mb-4 py-2 w-56 text-white"
        >
          Criar
        </button>
      </form>
    </Modal>
  )
}

export default SectorModal

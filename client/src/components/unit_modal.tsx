import { useState } from 'react'
import { createUnit } from '../services/unit'
import Modal from './modal'

const UnitModal = ({ onClose }: { onClose: () => void }) => {
  const [unitName, setUnitName] = useState('')

  const handleCreateUnit = async () => {
    try {
      const unit = await createUnit({ name: unitName })
      console.log('Unidade criada com sucesso!')
      onClose()
    } catch (error) {
      console.error(error)
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
        <input
          value={unitName}
          onChange={event => setUnitName(event.target.value)}
          type="text"
          placeholder="Nome"
          className="my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
        />
        <button
          onClick={handleCreateUnit}
          className="bg-primary-default rounded-md mt-2 mb-4 py-2 w-56 text-white"
        >
          Criar
        </button>
      </form>
    </Modal>
  )
}

export default UnitModal
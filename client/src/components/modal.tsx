interface Props {
  children: React.ReactNode
  onClose: () => void
}

const Modal = ({ children, onClose }: Props) => {
  return (
    <div className="flex items-center fixed left-0 top-0 w-full h-full overflow-auto bg-background">
      <div className="bg-white m-auto p-5 border-2 border-black w-4/5 rounded max-w-1/2">
        <span
          className="float-right font-bold text-xl hover:cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        {children}
      </div>
    </div>
  )
}

export default Modal

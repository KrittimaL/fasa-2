const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div onClick={onClose} className="absolute flex w-full h-full drop-shadow items-start justify-end top-[89px]">
            <div className="bg-secondary w-80 h-fit opacity-100 ">
                {children}
            </div>
        </div>
    )
}
export default Modal;
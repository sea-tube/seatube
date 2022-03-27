import { useEffect, useState } from "react"
import Modal from "react-modal"
import { FaTimesCircle } from "react-icons/fa"

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		minWidth: 280,
	},
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#__next")

interface Iprops {
	isOpen?: boolean
	onClose?: any
	children?: any
}

export default function App({ isOpen = false, onClose, children }: Iprops) {
	const [modalIsOpen, setIsOpen] = useState(false)

	useEffect(() => setIsOpen(isOpen), [isOpen])

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
	}

	function closeModal() {
		setIsOpen(false)
		onClose && onClose()
	}

	return (
		<div>
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel='Example Modal'>
				<button className='closeButton' onClick={closeModal}>
					<FaTimesCircle size={18} />
				</button>

				<div className='content'>{children}</div>
			</Modal>
		</div>
	)
}

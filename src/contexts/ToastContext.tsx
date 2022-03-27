import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import { createContext } from "react";

const toastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

type ToastProviderType = {
  showSuccess: (msg: string) => void,
  showError: (msg: string) => void,
  showInfo: (msg: string) => void,
  showWarning: (msg: string) => void,
  showLoading: (msg: string) => any
}

const ToastContext = createContext({} as ToastProviderType)

export function ToastProvider({ children }: any) {

  const showSuccess = (msg: string) => toast.success(msg, toastOptions)
  const showError = (msg: string) => toast.error(msg, toastOptions)
  const showInfo = (msg: string) => toast.info(msg, toastOptions)
  const showWarning = (msg: string) => toast.warning(msg, toastOptions)
  const showLoading = (msg: string) => {
    const id = toast.loading(msg, toastOptions)
    return {
      hide: () => toast.dismiss(id)
    }
  }

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showInfo, showWarning, showLoading }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{marginTop: 40}}
      />
      {children}
    </ToastContext.Provider>
  )
}

export default ToastContext
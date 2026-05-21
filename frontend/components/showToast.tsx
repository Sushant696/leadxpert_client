import toast from 'react-hot-toast'

export const showToast = {
  success: (message: string) => {
    toast.success(message)
  },

  error: (message: string) => {
    toast.error(message)
  },

  loading: (message: string) => {
    return toast.loading(message)
    // Returns ID for dismissing later
  },

  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string
      error: string
    }
  ) => {
    return toast.promise(promise, messages)
  },

  // Dismiss specific toast
  dismiss: (toastId: string) => {
    toast.dismiss(toastId)
  },

  // Dismiss all toasts
  dismissAll: () => {
    toast.dismiss()
  }
}

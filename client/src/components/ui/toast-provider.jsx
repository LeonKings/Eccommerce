import { createContext, useContext, useState } from "react";
import { Toast } from "./toast";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "default",
  });

  const showToast = (message, variant = "default") => {
    setToast({ show: true, message, variant });
    setTimeout(
      () => setToast({ show: false, message: "", variant: "default" }),
      3000
    );
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        message={toast.message}
        variant={toast.variant}
        show={toast.show}
        onClose={() =>
          setToast({ show: false, message: "", variant: "default" })
        }
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

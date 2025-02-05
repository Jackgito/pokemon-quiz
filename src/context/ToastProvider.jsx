import { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, Alert, AlertTitle } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import HomeTheme from '../themes/HomeTheme';

const ToastContext = createContext();

// ToastProvider should be used to inform the user if there was API error for example
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    open: false,
    title: "",
    message: "",
    severity: "success", // "success" | "error" | "warning" | "info"
  });

  const showToast = useCallback((title, message, severity = "success") => {
    setToast({ open: true, title, message, severity });
  }, []);

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ThemeProvider theme={HomeTheme()}>
        <Snackbar
          open={toast.open}
          autoHideDuration={7000}
          onClose={closeToast}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            variant='outlined'
            onClose={closeToast}
            severity={toast.severity}
            sx={{ width: '100%', backgroundColor: 'white', fontFamily: 'Orbitron, sans-serif' }}
          >
            <AlertTitle sx={{textAlign: "center"}}>{toast.title}</AlertTitle>
            {toast.message}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
export { ToastContext };
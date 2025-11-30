import { 
  ToastConfirmContainer, 
  ToastButtonConfirm, 
  ToastButtonCancel 
} from "./styles";

export function ConfirmModal({ 
    closeToast, 
    onConfirm, 
    message = "Tem certeza?", 
    confirmText = "Confirmar" 
}) {
  
  const handleConfirm = () => {
    onConfirm(); 
    closeToast(); 
  };

  return (
    <ToastConfirmContainer>
      <p>{message}</p>
      <div>
        <ToastButtonCancel onClick={closeToast}>
          Cancelar
        </ToastButtonCancel>
        <ToastButtonConfirm onClick={handleConfirm}>
          {confirmText}
        </ToastButtonConfirm>
      </div>
    </ToastConfirmContainer>
  );
}
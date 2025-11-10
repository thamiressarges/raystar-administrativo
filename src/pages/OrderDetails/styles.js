import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: ${({ $isopen }) => ($isopen ? "210px" : "80px")} auto;
  grid-template-rows: 105px auto;
  grid-template-areas:
    "brand header"
    "menu content";
  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
  transition: grid-template-columns 0.3s ease-in-out;
`;

export const Content = styled.div`
  grid-area: content;
  padding: 40px 80px; 
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 80px; 
`;

export const PageTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const TitleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const OrderDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  width: 100%;
  border-radius: 12px;
  padding: 28px 32px;
  box-shadow: 0 8px 30px rgba(17, 24, 39, 0.06);
`;

export const CardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
  
  svg {
    flex-shrink: 0;
  }
  
  h3 {
    line-height: 1.2;
    font-size: 16px;
    font-weight: 700;
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InfoLabel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const InfoValue = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

export const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  /* ================== MUDANÇA AQUI ================== */
  th, td {
    padding: 12px 0;
    text-align: left;
    vertical-align: middle; /* <-- ADICIONEI ESSA LINHA */
  }
  /* ================== FIM DA MUDANÇA ================== */

  th {
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
    padding-bottom: 8px;
    font-size: 12px;
    letter-spacing: .02em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.COLORS.GRAY_700};
  }

  /* As classes de alinhamento agora vão funcionar para TH e TD */
  .product-col { width: 50%; }
  .qty-col { text-align: center; width: 10%; }
  .price-col { width: 20%; } /* Não precisa de text-align, já é 'left' */
  .total-col { text-align: right; width: 20%; }
`;

export const ProductRow = styled.tr`
  td {
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
    height: 72px;
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  img {
    width: 56px;
    height: 56px;
    object-fit: cover;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.COLORS.GRAY_100};
  }
`;

export const QuantityContainer = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
  font-size: 14px;
  font-weight: 600;
`;

/* ===== PARTE DE BAIXO (STATUS, BOTÕES) ===== */
export const Status = styled.div`
  padding: 12px 20px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  
  background-color: ${({ theme, $status }) =>
    $status === "success"
      ? "rgba(16, 185, 129, .12)"
      : $status === "warning"
      ? "rgba(245, 158, 11, .12)"
      : $status === "info"
      ? "rgba(59, 130, 246, .12)"
      : "rgba(107, 114, 128, .12)"};
      
  color: ${({ theme, $status }) =>
    $status === "success"
      ? "#065f46"
      : $status === "warning"
      ? "#b45309"
      : $status === "info"
      ? "#1d4ed8"
      : "#111827"};
`;

export const Summary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 800;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const BaseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  svg {
    font-size: 16px;
  }

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }
  
  &:active {
    transform: scale(0.98);
    box-shadow: none;
  }
`;

export const SuccessButton = styled(BaseButton)`
  background-color: #16a34a;
  color: white;
`;

export const DangerButton = styled(BaseButton)`
  background-color: #ef4444;
  color: white;
`;

export const PrimaryButton = styled(BaseButton)`
  background-color: #2563eb;
  color: white;
`;

export const SecondaryButton = styled(BaseButton)`
  background-color: #374151;
  color: white;
  
  &:hover {
    background-color: #1f2937;
  }
`;

export const StaticStatusButton = styled(BaseButton)`
  background-color: rgba(16, 185, 129, .12);
  color: #065f46;
  font-weight: 600;
  cursor: default;
  
  &:hover {
    opacity: 1;
    transform: none;
    box-shadow: none;
  }
`;

/* ===== ESTILOS DO MODAL E QR CODE ===== */

export const ActionButton = styled(BaseButton)`
  background: #1fbad6;
  color: white;
`;

export const UberButton = styled(BaseButton).attrs({ as: 'a' })`
  background: #2563eb;
  color: white;
  text-decoration: none;
`;

export const QrContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  background: #ffffff;
  margin: 8px 0 4px;
`;

export const QrImage = styled.img`
  width: 260px;
  height: 260px;
  border-radius: 12px;
  image-rendering: pixelated;
`;

export const QrActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const HelperText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
`;

export const ModalContent = styled.div`
  background: #FFFFFF;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(17, 24, 39, 0.15);
  max-width: 500px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.COLORS.GRAY_700};
  font-size: 28px;
  line-height: 1;

  &:hover {
    color: #000;
  }
`;
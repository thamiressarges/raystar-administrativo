import styled, { css } from "styled-components";
import { ORDER_STATUS } from '../../utils/constants';
import { PageHeader } from '../../styles/commonStyles';

export const Header = styled(PageHeader)`
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const DateInfo = styled.div`
  text-align: right;
  small {
    display: block;
    color: ${({ theme }) => theme.COLORS.GRAY_500};
    font-size: 12px;
    margin-bottom: 2px;
  }
  strong {
    font-size: 18px;
    color: ${({ theme }) => theme.COLORS.GRAY_900};
  }
`;

export const ContentGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const Section = styled.section`
  width: 100%;
  background: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(16, 24, 40, 0.05);
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.COLORS.GRAY_900};
  font-size: 16px;

  svg {
    margin-right: 6px;
    color: ${({ theme }) => theme.COLORS.GRAY_500};
  }
`;

export const ClientGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }

  small {
    color: ${({ theme }) => theme.COLORS.GRAY_500};
    font-size: 13px;
    display: block;
    margin-bottom: 6px;
  }
  .clientValue {
    font-weight: 600;
    color: ${({ theme }) => theme.COLORS.GRAY_800};
    font-size: 15px;
    word-break: break-word;
  }
`;

export const ItemsList = styled.div`
  width: 100%;
  .itemsHead {
    display: grid;
    /* Ajustado para aproximar as colunas */
    grid-template-columns: 4fr 70px 100px 100px; 
    gap: 16px;
    padding: 0 0 12px 0;
    color: ${({ theme }) => theme.COLORS.GRAY_500};
    font-size: 13px;
    font-weight: 600;
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
    margin-bottom: 8px;
  }
`;

export const ItemRow = styled.div`
  display: grid;
  /* Ajustado para aproximar as colunas (mesmo valor do header) */
  grid-template-columns: 4fr 70px 100px 100px;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
  align-items: center;

  &:last-child { border-bottom: none; }
  .qty { text-align: center; }
  .price, .total { text-align: right; }
  .qty, .price, .total {
    font-weight: 600;
    color: ${({ theme }) => theme.COLORS.GRAY_700};
    font-size: 14px;
  }
`;

export const ItemDetails = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  img {
    width: 56px;
    height: 56px;
    border-radius: 8px;
    object-fit: cover;
    background: ${({ theme }) => theme.COLORS.GRAY_50};
    border: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
  }
  strong {
    font-size: 14px;
    color: ${({ theme }) => theme.COLORS.GRAY_900};
    display: block;
  }
`;

export const DeliveryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }

  small {
    color: ${({ theme }) => theme.COLORS.GRAY_500};
    font-size: 13px;
    display: block;
    margin-bottom: 6px;
  }
  .delValue {
    font-weight: 600;
    color: ${({ theme }) => theme.COLORS.GRAY_800};
    font-size: 15px;
  }
`;

export const Divider = styled.hr`
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
  margin: 16px 0;
`;

export const PickupCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  width: 100%;
  background: ${({ theme }) => theme.COLORS.INFO_LIGHT};
  border: 1px solid ${({ theme }) => theme.COLORS.INFO};
  border-radius: 12px;

  .icon {
    font-size: 24px;
    color: ${({ theme }) => theme.COLORS.INFO};
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    background: ${({ theme }) => theme.COLORS.WHITE};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  .info {
    strong {
      color: ${({ theme }) => theme.COLORS.BLUE_700};
      font-size: 16px;
      display: block;
      margin-bottom: 4px;
    }
    p { color: ${({ theme }) => theme.COLORS.INFO}; font-size: 14px; margin: 0; }
  }
`;

const bannerColors = {
  [ORDER_STATUS.PICKUP]: css` background: ${({ theme }) => theme.COLORS.INFO_LIGHT}; border: 1px solid ${({ theme }) => theme.COLORS.INFO}; color: ${({ theme }) => theme.COLORS.BLUE_700}; `,
  [ORDER_STATUS.DELIVERED]: css` background: ${({ theme }) => theme.COLORS.SUCCESS_LIGHT}; border: 1px solid ${({ theme }) => theme.COLORS.SUCCESS}; color: ${({ theme }) => theme.COLORS.GREEN_700}; `,
  [ORDER_STATUS.DELIVERED_PT]: css` background: ${({ theme }) => theme.COLORS.SUCCESS_LIGHT}; border: 1px solid ${({ theme }) => theme.COLORS.SUCCESS}; color: ${({ theme }) => theme.COLORS.GREEN_700}; `,
  [ORDER_STATUS.PAYMENT_PAID]: css` background: ${({ theme }) => theme.COLORS.SUCCESS_LIGHT}; border: 1px solid ${({ theme }) => theme.COLORS.SUCCESS}; color: ${({ theme }) => theme.COLORS.GREEN_700}; `,
  [ORDER_STATUS.SHIPPED]: css` background: ${({ theme }) => theme.COLORS.INDIGO_100}; border: 1px solid ${({ theme }) => theme.COLORS.INDIGO_800}; color: ${({ theme }) => theme.COLORS.INDIGO_800}; `,
  [ORDER_STATUS.PROCESSING]: css` background: ${({ theme }) => theme.COLORS.PURPLE_100}; border: 1px solid ${({ theme }) => theme.COLORS.PURPLE_500}; color: ${({ theme }) => theme.COLORS.PURPLE_800}; `,
  [ORDER_STATUS.CANCELED]: css` background: ${({ theme }) => theme.COLORS.DANGER_LIGHT}; border: 1px solid ${({ theme }) => theme.COLORS.DANGER}; color: ${({ theme }) => theme.COLORS.DANGER}; `,
  [ORDER_STATUS.CANCELED_PT]: css` background: ${({ theme }) => theme.COLORS.DANGER_LIGHT}; border: 1px solid ${({ theme }) => theme.COLORS.DANGER}; color: ${({ theme }) => theme.COLORS.DANGER}; `,
  [ORDER_STATUS.WAITING_CONFIRMATION]: css` background: ${({ theme }) => theme.COLORS.WARNING_LIGHT}; border: 1px solid ${({ theme }) => theme.COLORS.WARNING}; color: ${({ theme }) => theme.COLORS.AMBER_600}; `,
  [ORDER_STATUS.WAITING_PAYMENT]: css` background: ${({ theme }) => theme.COLORS.WARNING_LIGHT}; border: 1px solid ${({ theme }) => theme.COLORS.WARNING}; color: ${({ theme }) => theme.COLORS.AMBER_600}; `,
  default: css` background: ${({ theme }) => theme.COLORS.GRAY_50}; border: 1px solid ${({ theme }) => theme.COLORS.GRAY_200}; color: ${({ theme }) => theme.COLORS.GRAY_700}; `,
};

export const StatusBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  justify-content: space-between;
  width: 100%;
  ${({ type }) => bannerColors[type?.toLowerCase()] || bannerColors.default};

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }
  .content {
    flex: 1;
    strong { font-weight: 700; font-size: 15px; }
  }
`;

export const PaymentBanner = styled(StatusBanner)``;

export const Summary = styled.div`
  padding: 8px 0;
  margin-bottom: 24px;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.COLORS.GRAY_500};
  padding: 10px 0;
  font-size: 15px;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  font-weight: 800;
  padding-top: 16px;
  margin-top: 8px;
  border-top: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
  color: ${({ theme }) => theme.COLORS.GRAY_900};
`;

export const ButtonsRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
  & > button { flex: 1; min-width: 140px; }
`;

const BaseButton = styled.button`
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  font-size: 14px;
  &:hover { filter: brightness(0.95); transform: translateY(-1px); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
`;

export const PrimaryButton = styled(BaseButton)` background: ${({ theme }) => theme.COLORS.SUCCESS}; color: ${({ theme }) => theme.COLORS.WHITE}; `;
export const SecondaryButton = styled(BaseButton)` background: ${({ theme }) => theme.COLORS.DANGER}; color: ${({ theme }) => theme.COLORS.WHITE}; `;
export const RouteButton = styled(BaseButton)` background: ${({ theme }) => theme.COLORS.BLUE_700}; color: ${({ theme }) => theme.COLORS.WHITE}; `;

export const QrModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.COLORS.OVERLAY};
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const QrModal = styled.div`
  width: 400px;
  max-width: 90%;
  background: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img { width: 100%; border-radius: 8px; }
  h3 { margin-bottom: 12px; color: ${({ theme }) => theme.COLORS.GRAY_900}; text-align: center; }
  p { font-size: 13px; color: ${({ theme }) => theme.COLORS.GRAY_500}; text-align: center; margin-bottom: 16px; }
`;
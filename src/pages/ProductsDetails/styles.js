import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const IconBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  color: white;

  &:hover {
    filter: brightness(0.9);
  }
  
  svg {
    font-size: 18px;
  }
`;

export const EditButton = styled(IconBtn)`
  background-color: ${({ theme }) => theme.COLORS.BLUE_700};
`;

export const DeleteButton = styled(IconBtn)`
  background-color: ${({ theme }) => theme.COLORS.DANGER};
`;

export const MainCard = styled.div`
  background: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  display: flex;
  gap: 40px;
  margin-bottom: 24px;
  align-items: flex-start;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const ImageSection = styled.div`
  width: 550px;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const MainImage = styled.div`
  width: 100%;
  height: 450px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .placeholder {
    color: ${({ theme }) => theme.COLORS.GRAY_400};
  }

  @media (max-width: 768px) {
    height: 350px;
  }
`;

export const DeleteImageButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: ${({ theme }) => theme.COLORS.DANGER};
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.COLORS.WHITE};
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: filter 0.2s;
  z-index: 10;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const ThumbnailList = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  
  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent; 
  }
   
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.COLORS.GRAY_300}; 
    border-radius: 4px;
  }
`;

export const Thumbnail = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 8px;
  border: 2px solid ${({ theme, $active }) => $active ? theme.COLORS.BLACK : 'transparent'};
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  opacity: ${({ $active }) => $active ? 1 : 0.7};
  transition: all 0.2s;

  &:hover {
    opacity: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  padding-top: 8px;

  .rating {
    display: flex;
    align-items: center;
    gap: 4px;
    color: ${({ theme }) => theme.COLORS.GRAY_300};
    font-size: 14px;
    
    span {
        margin-left: 8px;
        color: ${({ theme }) => theme.COLORS.GRAY_500};
    }
  }

  .info-block {
    display: flex;
    flex-direction: column;
    gap: 6px;

    label {
        font-size: 13px;
        color: ${({ theme }) => theme.COLORS.GRAY_500};
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    p {
        font-size: 16px;
        color: ${({ theme }) => theme.COLORS.GRAY_900};
    }

    p.description {
        font-size: 15px;
        color: ${({ theme }) => theme.COLORS.GRAY_700};
        line-height: 1.7;
        white-space: pre-wrap;
    }
  }
`;

export const PriceTag = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.COLORS.GRAY_900};
  margin: 0;
`;

export const StockInfo = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const AvailabilityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  font-weight: 600;
  color: ${({ theme, $available }) => $available ? theme.COLORS.BLACK : theme.COLORS.GRAY_500}; 
  background: transparent;
  padding: 0; 
  
  svg {
    font-size: 20px;
    fill: ${({ theme, $available }) => $available ? theme.COLORS.BLACK : 'none'};
    color: ${({ theme, $available }) => $available ? theme.COLORS.BLACK : theme.COLORS.GRAY_500};
  }
`;

export const Section = styled.section`
  background: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  color: ${({ theme }) => theme.COLORS.GRAY_900};
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
`;

export const SectionHeaderFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const EmptyState = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.COLORS.GRAY_500};
  padding: 30px 0;
  font-size: 15px;
`;

export const VariationsTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    font-size: 14px;
    color: ${({ theme }) => theme.COLORS.GRAY_500};
    padding-bottom: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
  }

  td {
    padding: 16px 0;
    font-size: 15px;
    color: ${({ theme }) => theme.COLORS.GRAY_700};
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_50};
  }

  tr:last-child td {
    border-bottom: none;
  }

  td.actions {
    text-align: right;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.COLORS.GRAY_700};
  margin-bottom: ${({ $noMargin }) => $noMargin ? '0' : 'auto'};
`;

export const SwitchRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
`;

export const Input = styled.input`
  height: 48px;
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_300};
  font-size: 15px;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.COLORS.BLACK};
  }
`;

export const Select = styled.select`
  height: 48px;
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_300};
  font-size: 15px;
  width: 100%;
  background: white;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.COLORS.BLACK};
  }
`;

export const TextArea = styled.textarea`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_300};
  font-size: 15px;
  width: 100%;
  resize: vertical;
  font-family: inherit;
  min-height: 120px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.COLORS.BLACK};
  }
`;

export const AddImageBox = styled.label`
  width: 90px;
  height: 90px;
  border-radius: 8px;
  border: 2px dashed ${({ theme }) => theme.COLORS.GRAY_300};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.COLORS.GRAY_500};
  gap: 4px;
  font-size: 12px;
  background: ${({ theme }) => theme.COLORS.GRAY_50};
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.COLORS.GRAY_100};
    border-color: ${({ theme }) => theme.COLORS.GRAY_400};
    color: ${({ theme }) => theme.COLORS.GRAY_700};
  }

  input { display: none; }
  
  svg {
      font-size: 20px;
  }
`;

export const BottomActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
`;

export const SaveButton = styled.button`
  background: ${({ theme }) => theme.COLORS.BLACK};
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover { background: ${({ theme }) => theme.COLORS.GRAY_900}; }
  &:disabled { opacity: 0.7; cursor: not-allowed; }
`;

export const CancelButton = styled.button`
  background: ${({ theme }) => theme.COLORS.GRAY_100};
  color: ${({ theme }) => theme.COLORS.GRAY_800};
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background 0.2s;

  &:hover { background: ${({ theme }) => theme.COLORS.GRAY_200}; }
`;

export const VariationsInfoText = styled.p`
    color: #666;
    font-style: italic;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
    text-align: center;
`;

export const VariationHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const VariationLabel = styled.span`
    font-size: 14px;
    color: #666;
`;

export const VariationsWrapper = styled.div`
    margin-top: 16px;
`;

export const ReviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const ReviewItem = styled.div`
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
`;

export const AddVariationBtn = styled.button`
  margin-top: 16px;
  background: ${({ theme }) => theme.COLORS.BLACK};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    opacity: 0.9;
  }
`;

export const RemoveVarButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.COLORS.DANGER};
  cursor: pointer;
  padding: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.COLORS.DANGER_HOVER};
    background-color: ${({ theme }) => theme.COLORS.DANGER_LIGHT};
    border-radius: 4px;
  }
`;
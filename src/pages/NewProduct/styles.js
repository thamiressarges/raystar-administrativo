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
  background: ${({ theme }) => theme.COLORS.GRAY_100};
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const PageContainer = styled.div`
  grid-area: content;
  padding: 24px 64px 48px;
  overflow-y: auto; 
`;

export const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; 
  gap: 16px;
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  font-size: 28px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.COLORS.GRAY_900};
`;

export const BackLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: transparent;
  font-weight: 600;
  cursor: pointer;
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.GRAY_700};

  &:hover {
    color: ${({ theme }) => theme.COLORS.BLACK};
  }
`;

export const SaveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: ${({ theme }) => theme.COLORS.SUCCESS}; 
  color: ${({ theme }) => theme.COLORS.WHITE};
  cursor: pointer;
  font-weight: 600;

  &:hover { 
    background: ${({ theme }) => theme.COLORS.SUCCESS_HOVER}; 
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  height: 48px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_300};
  font-size: 16px;
  background: ${({ theme }) => theme.COLORS.WHITE};
  color: ${({ theme }) => theme.COLORS.GRAY_700};

  &:focus {
    border-color: ${({ theme }) => theme.COLORS.BLUE_700};
    outline: none;
  }
  
  &[type="date"] {
    font-family: inherit;
  }
`;

export const Textarea = styled.textarea`
  height: 150px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_300};
  font-size: 16px;
  resize: vertical;
  background: ${({ theme }) => theme.COLORS.WHITE};
  color: ${({ theme }) => theme.COLORS.GRAY_700};

  &:focus {
    border-color: ${({ theme }) => theme.COLORS.BLUE_700};
    outline: none;
  }
`;

export const Select = styled.select`
  height: 48px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_300};
  font-size: 16px;
  background: ${({ theme }) => theme.COLORS.WHITE};
  color: ${({ theme }) => theme.COLORS.GRAY_700};

  &:focus {
    border-color: ${({ theme }) => theme.COLORS.BLUE_700};
    outline: none;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
  
  & > h2 {
      margin-bottom: 0;
      color: ${({ theme }) => theme.COLORS.GRAY_900};
  }
`;

export const SimpleSwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const SwitchControlWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 15px; 
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
  
  label {
    font-weight: 600;
    font-size: 16px;
    color: ${({ theme }) => theme.COLORS.GRAY_700};
  }
`;

export const Section = styled.section`
  background: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 16px;
  padding: 24px; 
  box-shadow: 0 8px 28px rgba(0,0,0,0.06);
  flex-grow: 1; 
  
  > h2 {
    font-size: 20px;
    margin-top: 0;
    margin-bottom: 8px; 
    color: ${({ theme }) => theme.COLORS.GRAY_900};
  }
  
  > p {
    font-size: 15px;
    color: ${({ theme }) => theme.COLORS.GRAY_500};
    margin-top: 0;
    margin-bottom: 20px;
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
    padding-bottom: 20px;
  }
  
  & > ${SectionHeader} + p {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 15px;
  }
`;

export const MainContentGrid = styled.div`
  display: flex; 
  gap: 24px;
  margin-bottom: 18px; 
  align-items: stretch; 

  > div {
    flex: 1; 
  }

  > div:first-child { 
    flex-basis: 40%; 
    max-width: 40%; 
  }
  > div:last-child { 
    flex-basis: 60%; 
    max-width: 60%; 
  }
`;

export const LeftColumn = styled.div`
  display: flex; 
  flex-direction: column;
`;

export const RightColumn = styled.div`
  display: flex; 
  flex-direction: column;
  
  > ${Section} {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px; 
  
  &:last-child {
    flex-grow: 1; 
  }
  
  & > ${Textarea} {
      flex-grow: 1; 
      min-height: 150px; 
  }

  label {
    font-weight: 600; 
    font-size: 16px;
    color: ${({ theme }) => theme.COLORS.GRAY_700};
  }
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;

  label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    color: ${({ theme }) => theme.COLORS.GRAY_700};
    
    input[type="checkbox"] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 18px;
        height: 18px;
        border: 2px solid ${({ theme }) => theme.COLORS.GRAY_300}; 
        border-radius: 4px;
        cursor: pointer;
        outline: none;
        transition: all 0.2s ease-in-out;
        display: grid;
        place-content: center;
        background: ${({ theme }) => theme.COLORS.WHITE};
        
        &::before {
            content: "\u2713"; 
            font-size: 14px;
            color: ${({ theme }) => theme.COLORS.WHITE}; 
            transform: scale(0);
            transition: transform 0.2s ease-in-out;
            line-height: 1;
        }

        &:checked {
            background-color: ${({ theme }) => theme.COLORS.BLACK}; 
            border-color: ${({ theme }) => theme.COLORS.BLACK}; 
        }

        &:checked::before {
            transform: scale(1);
        }
    }
  }

  span {
    font-size: 14px;
    color: ${({ theme }) => theme.COLORS.GRAY_500};
  }
`;

export const ImageUploadArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: flex-start; 
`;

export const UploadHint = styled.p`
    text-align: center;
    color: ${({ theme }) => theme.COLORS.GRAY_500};
    font-size: 14px;
    margin: 0;
`;

export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 12px;
  background: ${({ theme }) => theme.COLORS.GRAY_50};
  border: 2px dashed ${({ theme }) => theme.COLORS.GRAY_300};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: ${({ theme }) => theme.COLORS.GRAY_500};
  font-weight: 500;
  cursor: pointer; 

  svg {
    font-size: 32px;
  }

  &:hover {
    background: ${({ theme }) => theme.COLORS.GRAY_100};
  }
`;

export const ThumbnailList = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto; 
  padding-bottom: 8px; 
`;

const ThumbnailBase = styled.div`
  width: 70px;     
  height: 70px;   
  border-radius: 8px;
  flex-shrink: 0; 
  border: 2px solid transparent;
`;

export const AddThumbnailButton = styled(ThumbnailBase)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.COLORS.GRAY_50};
  border: 2px dashed ${({ theme }) => theme.COLORS.GRAY_300};
  color: ${({ theme }) => theme.COLORS.GRAY_500};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.COLORS.GRAY_100};
  }
`;

export const ThumbnailPreview = styled(ThumbnailBase)`
  overflow: hidden;
  position: relative;
  border-color: ${({ theme }) => theme.COLORS.GRAY_200};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const DeleteImageButton = styled.button`
  position: absolute;
  top: -8px; 
  right: -8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ theme }) => theme.COLORS.DANGER}; 
  border: 2px solid ${({ theme }) => theme.COLORS.WHITE};
  color: ${({ theme }) => theme.COLORS.WHITE};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  
  &:hover {
    background: ${({ theme }) => theme.COLORS.DANGER_HOVER};
  }
`;

export const VariationsControl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  p {
    margin: 0;
    padding: 0;
    border: none;
    font-size: 15px;
    color: ${({ theme }) => theme.COLORS.GRAY_500};
  }
`;

export const SimpleProductWarning = styled.div`
  padding: 20px;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.GRAY_500}; 
  font-style: italic;
  font-size: 16px;
  background: ${({ theme }) => theme.COLORS.GRAY_50};
  border-radius: 8px;
  margin-top: 10px;
`;

export const AddVariationButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: ${({ theme }) => theme.COLORS.BLACK};
  color: ${({ theme }) => theme.COLORS.WHITE};
  cursor: pointer;
  font-weight: 600;

  &:hover { 
      background: ${({ theme }) => theme.COLORS.PRIMARY_HOVER};
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.GRAY_500}; 
  font-size: 15px;
  font-weight: 500;
  border-top: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
  margin-top: 20px;
`;

export const VariationsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px; 

  th, td {
    text-align: left;
    padding: 12px 8px;
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
  }

  th {
    font-size: 14px;
    color: ${({ theme }) => theme.COLORS.GRAY_500};
    text-transform: uppercase;
  }

  td {
    font-size: 15px;
    font-weight: 500;
    vertical-align: middle; 
    color: ${({ theme }) => theme.COLORS.GRAY_700};
  }
`;

export const TableInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 2px solid ${({ theme }) => theme.COLORS.GRAY_200};
  border-radius: 6px;
  font-size: 15px;
  background: ${({ theme }) => theme.COLORS.WHITE};
  color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const DeleteVariationButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.COLORS.DANGER};
  cursor: pointer;
  padding: 4px;
  display: flex; 
  align-items: center;
  
  &:hover {
    color: ${({ theme }) => theme.COLORS.DANGER_HOVER};
  }
`;
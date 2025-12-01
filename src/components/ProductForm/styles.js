import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const MainGrid = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const LeftColumn = styled.div`
  flex: 0 0 350px;
  width: 350px;

  @media (max-width: 1024px) {
    width: 100%;
    flex: 1;
  }
`;

export const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const Section = styled.section`
  background: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER || '#E5E7EB'};

  > h2 {
    font-size: 18px;
    margin: 0 0 16px 0;
    color: ${({ theme }) => theme.COLORS.GRAY_900};
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
    padding-bottom: 12px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;

  label {
    font-weight: 600;
    font-size: 14px;
    color: ${({ theme }) => theme.COLORS.GRAY_700};
  }

  span.error {
    color: ${({ theme }) => theme.COLORS.DANGER};
    font-size: 12px;
  }
`;

export const Input = styled.input`
  height: 48px;
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_300};
  background: ${({ theme }) => theme.COLORS.WHITE};
  color: ${({ theme }) => theme.COLORS.GRAY_900};
  font-size: 15px;
  width: 100%;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.COLORS.BLACK};
  }
`;

export const Select = styled.select`
  height: 48px;
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_300};
  background: ${({ theme }) => theme.COLORS.WHITE};
  color: ${({ theme }) => theme.COLORS.GRAY_900};
  font-size: 15px;
  width: 100%;
  appearance: none; 
  
  &:focus {
    border-color: ${({ theme }) => theme.COLORS.BLACK};
  }
`;

export const Textarea = styled.textarea`
  min-height: 120px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_300};
  background: ${({ theme }) => theme.COLORS.WHITE};
  color: ${({ theme }) => theme.COLORS.GRAY_900};
  font-size: 15px;
  width: 100%;
  resize: vertical;
  font-family: inherit;

  &:focus {
    border-color: ${({ theme }) => theme.COLORS.BLACK};
  }
`;

export const ImageUploadArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ImagePreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  gap: 8px;
`;

export const ImageBox = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 20px;
    height: 20px;
    background: ${({ theme }) => theme.COLORS.DANGER};
    color: white;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 12px;
    
    &:hover {
      background: ${({ theme }) => theme.COLORS.DANGER_HOVER};
    }
  }
`;

export const UploadButton = styled.label`
  aspect-ratio: 1;
  border-radius: 8px;
  border: 2px dashed ${({ theme }) => theme.COLORS.GRAY_300};
  background: ${({ theme }) => theme.COLORS.GRAY_50};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.COLORS.GRAY_500};
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.COLORS.GRAY_100};
    border-color: ${({ theme }) => theme.COLORS.GRAY_400};
  }

  input {
    display: none;
  }
`;

export const VariationsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;

  th {
    text-align: left;
    font-size: 13px;
    color: ${({ theme }) => theme.COLORS.GRAY_500};
    padding-bottom: 8px;
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
  }

  td {
    padding: 12px 0;
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
  }

  input {
    height: 40px;
    font-size: 14px;
  }
`;

export const ActionsBar = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
`;

export const ButtonBase = styled.button`
  height: 48px;
  padding: 0 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: filter 0.2s;
  border: none;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SaveButton = styled(ButtonBase)`
  background: ${({ theme }) => theme.COLORS.SUCCESS};
  color: ${({ theme }) => theme.COLORS.WHITE};

  &:hover {
    filter: brightness(0.9);
  }
`;

export const CancelButton = styled(ButtonBase)`
  background: ${({ theme }) => theme.COLORS.GRAY_200};
  color: ${({ theme }) => theme.COLORS.GRAY_800};

  &:hover {
    background: ${({ theme }) => theme.COLORS.GRAY_300};
  }
`;

export const AddVariationButton = styled.button`
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

export const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  > span {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.COLORS.GRAY_700};
  }
`;
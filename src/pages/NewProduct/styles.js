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
`;

export const SaveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: #10B981; 
  color: #fff;
  cursor: pointer;
  font-weight: 600;

  &:hover { 
    background: #059669; 
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Section = styled.section`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px; 
  box-shadow: 0 8px 28px rgba(0,0,0,0.06);
  height: 100%; 

  > h2 {
    font-size: 20px;
    margin-top: 0;
    margin-bottom: 8px; 
  }
  
  > p {
    font-size: 15px;
    color: #6B7280;
    margin-top: 0;
    margin-bottom: 20px;
    border-bottom: 1px solid #F3F4F6;
    padding-bottom: 20px;
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
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px; 

  label {
    font-weight: 600; 
    font-size: 16px;
    color: #374151;
  }
`;

export const Input = styled.input`
  height: 48px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

export const Textarea = styled.textarea`
  height: 150px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  resize: vertical;
`;

export const Select = styled.select`
  height: 48px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  background: #fff;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;

  label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }

  span {
    font-size: 14px;
    color: #6B7280;
  }
`;

export const ImageUploadArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: flex-start; 
`;

export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 12px;
  background: #F9FAFB;
  border: 2px dashed #D1D5DB;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #6B7280;
  font-weight: 500;
  cursor: pointer; 

  svg {
    font-size: 32px;
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
  background: #F9FAFB;
  border: 2px dashed #D1D5DB;
  color: #6B7280;
  cursor: pointer;

  &:hover {
    background: #F3F4F6;
  }
`;

export const ThumbnailPreview = styled(ThumbnailBase)`
  overflow: hidden;
  position: relative;
  
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
  background: #EF4444; 
  border: 2px solid #fff;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  
  &:hover {
    background: #DC2626;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AddVariationButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: #000;
  color: #fff;
  cursor: pointer;
  font-weight: 600;

  &:hover { opacity: .95; }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  text-align: center;
  color: #6B7280; 
  font-size: 15px;
  font-weight: 500;
  border-top: 1px solid #F3F4F6;
  margin-top: 20px;
`;

export const VariationsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px; 

  th, td {
    text-align: left;
    padding: 12px 8px;
    border-bottom: 1px solid #F3F4F6;
  }

  th {
    font-size: 14px;
    color: #6B7280;
    text-transform: uppercase;
  }

  td {
    font-size: 15px;
    font-weight: 500;
    vertical-align: middle; 
  }
`;

export const TableInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 2px solid #E5E7EB;
  border-radius: 6px;
  font-size: 15px;
`;

export const DeleteVariationButton = styled.button`
  background: transparent;
  border: none;
  color: #EF4444;
  cursor: pointer;
  padding: 4px;
  display: flex; 
  align-items: center;
  
  &:hover {
    color: #DC2626;
  }
`;
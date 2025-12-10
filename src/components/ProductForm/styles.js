import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 24px;
  align-items: flex-start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftColumn = styled.div`
  width: 100%;
`;

export const RightColumn = styled.div`
  width: 100%;
`;

export const Card = styled.div`
  background: #FFFFFF;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);

  .card-title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 16px;
    color: #111827;
  }

  .hint {
    font-size: 13px;
    color: #9CA3AF;
    margin-top: 12px;
    text-align: center;
  }

  .availability-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    margin-top: 8px;

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 600;
      color: #111827;
      cursor: pointer;

      input {
        width: 16px;
        height: 16px;
        accent-color: #000;
        cursor: pointer;
      }
    }

    .stock-info {
      font-size: 13px;
      color: #6B7280;
    }
  }
`;

export const ImagePreviewArea = styled.div`
  width: 100%;
  height: 300px;
  border: 1px dashed #D1D5DB;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F9FAFB;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const MainImagePlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #9CA3AF;

  span {
    font-size: 14px;
  }
`;

export const ThumbnailsList = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const ThumbnailItem = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 8px;
  border: 2px solid ${({ $active }) => $active ? '#000' : '#E5E7EB'};
  overflow: hidden;
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    position: absolute;
    top: 2px;
    right: 2px;
    background: rgba(255, 0, 0, 0.8);
    color: white;
    border: none;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    display: none;
  }

  &:hover button {
    display: flex;
  }
`;

export const AddImageButton = styled.label`
  width: 70px;
  height: 70px;
  border-radius: 8px;
  border: 1px dashed #D1D5DB;
  background-color: #F9FAFB;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6B7280;
  transition: all 0.2s;

  &:hover {
    background-color: #F3F4F6;
    border-color: #9CA3AF;
  }

  input { display: none; }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;

  .error {
    font-size: 12px;
    color: #EF4444;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`;

export const Input = styled.input`
  height: 48px;
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid #D1D5DB;
  font-size: 14px;
  background: #FFFFFF;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #000;
  }
`;

export const Select = styled.select`
  height: 48px;
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid #D1D5DB;
  font-size: 14px;
  background: #FFFFFF;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #000;
  }
`;

export const Textarea = styled.textarea`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #D1D5DB;
  font-size: 14px;
  background: #FFFFFF;
  width: 100%;
  resize: vertical;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #000;
  }
`;

export const VariationsSection = styled.div`
  width: 100%;
`;

export const VariationsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    color: #111827;
  }
`;

export const EmptyVariationsBox = styled.div`
  background-color: #F9FAFB;
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  
  p {
    color: #6B7280;
    font-style: italic;
    font-size: 14px;
    margin: 0;
  }
`;

export const VariationsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th {
    text-align: left;
    font-size: 13px;
    color: #6B7280;
    font-weight: 600;
    padding-bottom: 12px;
    border-bottom: 1px solid #E5E7EB;
  }

  td {
    padding: 16px 0;
    border-bottom: 1px solid #F3F4F6;
    font-size: 14px;
    color: #1F2937;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

export const AddVariationButton = styled.button`
  background-color: #000;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #EF4444;
  cursor: pointer;
  
  &:hover {
    color: #DC2626;
  }
`;
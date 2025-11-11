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

export const PageWrapper = styled.div`
  grid-area: content;
  padding: 24px 64px 48px;
  overflow-y: auto; 
`;

export const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 10px;
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

export const Title = styled.h1`
  font-size: 28px;
  margin: 0;
`;

export const Section = styled.section`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px; 
  margin-top: 18px;
  box-shadow: 0 8px 28px rgba(0,0,0,0.06);
`;

export const SectionHeader = styled.div`
  background: #f6edff;
  border-radius: 12px;
  padding: 12px 14px;
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h3`
  margin: 0;
  color: #000;
`;

export const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 180px auto; 
  gap: 14px;
  align-items: center;

  margin-bottom: 16px; 

  label {
    font-weight: 600;
    font-size: 16px;
    color: #374151; 
  }

  p {
    font-size: 16px; 
    margin: 0; 
    font-weight: 500;
    color: #6B7280; 
  }
`;

export const StatusText = styled.p`
  font-size: 16px; 
  margin: 0; 
  font-weight: 600;
  
  color: ${({ $isActive }) => ($isActive ? '#10B981' : '#EF4444')};
`;

export const ScrollArea = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding-right: 8px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #c7c7c7;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const ProductsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
`;

export const Tr = styled.tr`
  &:not(:last-child) td {
    border-bottom: 1px solid #f3f4f6;
  }
`;

export const Td = styled.td`
  padding: 16px 12px;
`;

export const ActionsRow = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #F3F4F6;
  display: flex;
  justify-content: flex-end;
  gap: 12px; 
`;

export const EditButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: #000;
  color: #fff;
  cursor: pointer;

  &:hover {
    opacity: .95;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const DeleteButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: #EF4444; 
  color: #fff;
  cursor: pointer;

  &:hover {
    background: #DC2626; 
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px; 

  label {
    font-weight: 600; 
  }

  input,
  textarea {
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 16px;
  }

  textarea {
    height: 120px;
    resize: none;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px; 
`;

export const CancelButton = styled.button`
  width: 48%;
  padding: 12px;
  border-radius: 8px;
  background: #eee;
  border: none;
  cursor: pointer;
  font-weight: 600; 

  &:hover {
    background: #ddd;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SaveButton = styled.button`
  width: 48%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #000;
  color: #fff;
  cursor: pointer;
  font-weight: 600; 

  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
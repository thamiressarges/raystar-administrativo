import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 20px;
`;

export const ModalContent = styled.div`
  background: #fff;
  width: 100%;
  max-width: 700px;
  padding: 30px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  color: #333;
  margin: 0;
`;

export const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap; 
  gap: 16px; 
  align-items: flex-end; 
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1 1 200px;

  &.small {
    flex-basis: 120px;
  }
  
  label {
    font-weight: 600; 
    font-size: 14px; 
    color: #374151;
  }

  input {
    height: 44px;
    padding: 0 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 16px;
    width: 100%; 
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  gap: 16px; 
`;

export const CancelButton = styled.button`
  width: 100%;
  flex-basis: 50%;
  padding: 12px;
  border-radius: 8px;
  background: #eee;
  border: none;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: #ddd;
  }
`;

export const SaveButton = styled.button`
  width: 100%; 
  flex-basis: 50%;
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
`;
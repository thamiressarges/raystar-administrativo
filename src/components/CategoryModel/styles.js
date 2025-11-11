import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background: #fff;
  width: 600px;
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
`;

export const Subtitle = styled.p`
  text-align: center;
  color: #666;
  margin-top: -10px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  input,
  textarea,
  select {
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
  margin-top: 10px;
`;

export const CancelButton = styled.button`
  width: 48%;
  padding: 12px;
  border-radius: 8px;
  background: #eee;
  border: none;
  cursor: pointer;

  &:hover {
    background: #ddd;
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

  &:hover {
    opacity: 0.9;
  }
`;

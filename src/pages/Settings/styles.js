import styled from "styled-components";
import { Button } from "../../components/Button";

export const Container = styled.div`
  display: grid;
  grid-template-columns: ${({ $isopen }) => ($isopen ? "210px" : "80px")};
  grid-template-rows: 105px auto;
  grid-template-areas:
    "brand header"
    "menu content";
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
  transition: grid-template-columns 0.3s ease-in-out;
`;

export const Content = styled.div`
  grid-area: content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 40px 40px;
  overflow-y: auto;
  width: 100%;
`;

export const Form = styled.form`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  width: 90%;
  max-width: 900px;
  border-radius: 10px;
  padding: 40px 60px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.COLORS.GRAY_900};
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const CancelButton = styled(Button).attrs({
  style: { marginTop: 0 },
})`
  background-color: ${({ theme }) => theme.COLORS.GRAY_200};
  color: ${({ theme }) => theme.COLORS.GRAY_800};
  width: auto;
  height: 40px;
  padding: 0 16px;
  font-size: 14px;
  border-radius: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.COLORS.GRAY_300};
    opacity: 1;
  }
`;

export const SaveButton = styled(Button).attrs({
  style: { marginTop: 0 },
})`
  background-color: ${({ theme }) => theme.COLORS.SUCCESS};
  color: ${({ theme }) => theme.COLORS.WHITE};
  width: auto;
  height: 40px;
  padding: 0 16px;
  font-size: 14px;
  border-radius: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.COLORS.SUCCESS_HOVER};
    opacity: 1;
  }
`;

export const IconButton = styled.button`
  background-color: ${({ theme }) => theme.COLORS.BLUE_700};
  color: ${({ theme }) => theme.COLORS.WHITE};
  border: none;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
  margin-bottom: 24px;

  > label {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.COLORS.GRAY_700};
  }
`;

export const InfoDisplay = styled.div`
  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
  padding: 0 16px;
  border-radius: 8px;
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.GRAY_900};
  min-height: 56px;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const InfoGroup = styled.div`
  display: flex;
  gap: 16px;

  > div {
    flex: 1;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 16px;

  > h4 {
    font-size: 20px;
    color: ${({ theme }) => theme.COLORS.GRAY_900};
  }
`;

export const ContactRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;

  > span:first-child {
    font-size: 16px;
    color: ${({ theme }) => theme.COLORS.GRAY_700};
    width: 20px;
  }

  > .phone-text {
    font-size: 16px;
    color: ${({ theme }) => theme.COLORS.GRAY_900};
    background-color: ${({ theme }) => theme.COLORS.GRAY_100};
    padding: 0 16px;
    border-radius: 8px;
    min-height: 56px;
    display: flex;
    align-items: center;
    flex: 1;
  }

  .trash-button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.COLORS.DANGER};
    cursor: pointer;
    padding: 8px;

    &:hover {
      color: ${({ theme }) => theme.COLORS.DANGER_HOVER};
    }
  }
`;

export const ButtonLink = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.COLORS.BLUE_700};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
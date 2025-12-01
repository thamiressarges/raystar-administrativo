import styled from "styled-components";
import { Button } from "../../components/Button";

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`;

export const Form = styled.form`
    background-color: ${({ theme }) => theme.COLORS.WHITE};
    width: 100%;
    max-width: 900px;
    border-radius: 16px;
    padding: 40px 60px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};

    @media (max-width: 768px) {
        padding: 24px;
    }
`;

export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};

    h2 {
        font-size: 24px;
        font-weight: 700;
        color: ${({ theme }) => theme.COLORS.GRAY_900};
        margin: 0;
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
        font-weight: 600;
        color: ${({ theme }) => theme.COLORS.GRAY_700};
    }
`;

export const InfoDisplay = styled.div`
    background-color: ${({ theme }) => theme.COLORS.GRAY_50};
    padding: 0 16px;
    border-radius: 8px;
    font-size: 16px;
    color: ${({ theme }) => theme.COLORS.GRAY_800};
    min-height: 56px;
    display: flex;
    align-items: center;
    width: 100%;
    border: 1px solid transparent; 
`;

export const InfoGroup = styled.div`
    display: flex;
    gap: 24px;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 0;
    }

    > div {
        flex: 1;
    }
`;

export const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 32px;
    margin-bottom: 24px;
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
    padding-bottom: 8px;

    > h4 {
        font-size: 18px;
        color: ${({ theme }) => theme.COLORS.GRAY_900};
        margin: 0;
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
        background-color: ${({ theme }) => theme.COLORS.GRAY_50};
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
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            color: ${({ theme }) => theme.COLORS.DANGER_HOVER};
            background-color: ${({ theme }) => theme.COLORS.DANGER_LIGHT || '#FEE2E2'};
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
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;

    &:hover {
        background-color: ${({ theme }) => theme.COLORS.INFO_LIGHT || '#DBEAFE'};
    }
`;
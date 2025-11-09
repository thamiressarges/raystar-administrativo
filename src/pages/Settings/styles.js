import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-columns: ${({ $isopen }) => ($isopen ? '210px' : '80px')};
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
    justify-content: center;
    align-items: flex-start;
    padding: 40px;
    overflow-y: auto;
`;

export const Form = styled.form`
    background-color: ${({ theme }) => theme.COLORS.WHITE};
    width: 90%;
    max-width: 900px;
    border-radius: 10px;
    padding: 40px 60px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const FormHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    padding-bottom: 24px;
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};

    > h2 {
        font-size: 28px;
        font-weight: 700;
        color: ${({ theme }) => theme.COLORS.BLACK};
    }
`;

export const ActionButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 16px;
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
    color: ${({ theme }) => theme.COLORS.BLACK};
    min-height: 56px;
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
`;

export const InfoGroup = styled.div`
    display: flex;
    gap: 16px;

    > div {
        flex: 1;
    }
`;

export const AddressRow = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 8px;

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
        color: ${({ theme }) => theme.COLORS.BLACK};
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
        color: ${({ theme }) => theme.COLORS.BLACK};
        background-color: ${({ theme }) => theme.COLORS.GRAY_100};
        padding: 0 16px;
        border-radius: 8px;
        min-height: 56px;
        display: flex;
        align-items: center;
        flex: 1;
    }

    > div {
        flex: 1;
    }

    .trash-button {
        background: none;
        border: none;
        color: ${({ theme }) => theme.COLORS.RED};
        cursor: pointer;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.2s;

        &:hover {
            color: ${({ theme }) => theme.COLORS.DARK_RED};
        }
    }
`;

export const ButtonLink = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    color: ${({ theme }) => theme.COLORS.PRIMARY};
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;
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
    padding: 24px 64px 48px;
    overflow-y: auto;
    max-width: 1120px; 
    margin: 0 auto;
    width: 100%;
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
    margin-bottom: 24px;
    color: ${({ theme }) => theme.COLORS.GRAY_700};

    &:hover {
        color: ${({ theme }) => theme.COLORS.BLACK};
    }
`;

export const ProfileCard = styled.div`
    background: #ffffff;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 8px 28px rgba(0,0,0,0.06);
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 32px;
`;

export const Avatar = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #7C3AED; 
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: 500;
    flex-shrink: 0;
`;

export const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    h2 {
        font-size: 24px;
        margin: 0;
        color: #111;
    }

    span {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        color: ${({ theme }) => theme.COLORS.GRAY_700};
        
        svg {
            color: ${({ theme }) => theme.COLORS.GRAY_500};
        }
    }
`;

export const Section = styled.section`
    background: #ffffff;
    border-radius: 16px;
    padding: 32px; 
    margin-top: 18px;
    box-shadow: 0 8px 28px rgba(0,0,0,0.06);

    > h3 {
        font-size: 22px;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
    }
`;

export const PendingHeader = styled.h3`
    color: #D97706; 
    svg {
      color: #D97706;
    }
`;

export const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: #16A34A; 
  cursor: pointer;
  padding: 4px;
  
  &:hover { color: #15803D; }
  &:disabled { color: #9CA3AF; cursor: not-allowed; }
`;

export const AdminTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 24px;

    th, td {
        text-align: left;
        padding: 16px 8px;
        border-bottom: 1px solid #F3F4F6;
    }

    th {
        font-size: 14px;
        color: #6B7280;
        text-transform: uppercase;
    }

    td {
        font-size: 16px;
        font-weight: 500;

        &.user-cell {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .role-tag {
            background: #E0E7FF;
            color: #3730A3;
            font-size: 12px;
            font-weight: 600;
            padding: 4px 10px;
            border-radius: 20px;
            text-transform: capitalize;
        }

        .role-tag.super {
            background: #D1FAE5;
            color: #065F46;
        }
    }
`;

export const MiniAvatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #E9D5FF; 
    color: #5B21B6; 
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
    flex-shrink: 0;
`;

export const TrashButton = styled.button`
    background: transparent;
    border: none;
    color: #EF4444;
    cursor: pointer;
    padding: 4px;
    
    &:hover {
        color: #DC2626;
    }

    &:disabled {
        color: #9CA3AF; 
        cursor: not-allowed;
    }
`;
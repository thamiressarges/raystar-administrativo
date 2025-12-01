import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  padding: 40px 64px 48px;
  max-width: 1120px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 20px 20px;
  }
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
  background: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 28px rgba(0,0,0,0.06);
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ theme }) => theme.COLORS.PURPLE_500};
  color: ${({ theme }) => theme.COLORS.WHITE};
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
    color: ${({ theme }) => theme.COLORS.PRIMARY};
  }

  span {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    color: ${({ theme }) => theme.COLORS.GRAY_700};
    
    @media (max-width: 768px) {
        justify-content: center;
    }
    
    svg {
      color: ${({ theme }) => theme.COLORS.GRAY_500};
    }
  }
`;

export const Section = styled.section`
  background: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 16px;
  padding: 32px;
  margin-top: 18px;
  box-shadow: 0 8px 28px rgba(0,0,0,0.06);

  @media (max-width: 768px) {
    padding: 20px;
  }

  > h3 {
    font-size: 22px;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
    color: ${({ theme }) => theme.COLORS.GRAY_900};
  }
`;

export const PendingHeader = styled.h3`
  color: ${({ theme }) => theme.COLORS.AMBER_600};

  svg {
    color: ${({ theme }) => theme.COLORS.AMBER_600};
  }
`;

export const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.COLORS.GREEN_600};
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: ${({ theme }) => theme.COLORS.GREEN_700};
  }

  &:disabled {
    color: ${({ theme }) => theme.COLORS.GRAY_400};
    cursor: not-allowed;
  }
`;

export const AdminTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 24px;
  display: table;

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  th, td {
    text-align: left;
    padding: 16px 8px;
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
  }

  th {
    font-size: 14px;
    color: ${({ theme }) => theme.COLORS.GRAY_500};
    text-transform: uppercase;
  }

  td {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.COLORS.GRAY_700};

    &.user-cell {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .role-tag {
      background: ${({ theme }) => theme.COLORS.INDIGO_100};
      color: ${({ theme }) => theme.COLORS.INDIGO_800};
      font-size: 12px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 20px;
      text-transform: capitalize;
    }

    .role-tag.super {
      background: ${({ theme }) => theme.COLORS.SUCCESS_LIGHT};
      color: ${({ theme }) => theme.COLORS.SUCCESS_HOVER};
    }
  }
`;

export const MiniAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.COLORS.PURPLE_100};
  color: ${({ theme }) => theme.COLORS.PURPLE_800};
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
  color: ${({ theme }) => theme.COLORS.DANGER};
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: ${({ theme }) => theme.COLORS.DANGER_HOVER};
  }

  &:disabled {
    color: ${({ theme }) => theme.COLORS.GRAY_400};
    cursor: not-allowed;
  }
`;
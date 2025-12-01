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
  color: ${({ theme }) => theme.COLORS.GRAY_900};
`;

export const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Section = styled.section`
  background: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 16px;
  padding: 24px;
  margin-top: 18px;
  box-shadow: 0 8px 28px rgba(0,0,0,0.06);

  > h2 {
    font-size: 20px;
    margin-top: 0;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
    color: ${({ theme }) => theme.COLORS.GRAY_900};
  }
`;

export const EditButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: ${({ theme }) => theme.COLORS.BLUE_700};
  color: ${({ theme }) => theme.COLORS.WHITE};
  cursor: pointer;

  &:hover {
    opacity: 0.95;
  }
`;

export const DeleteButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: ${({ theme }) => theme.COLORS.DANGER};
  color: ${({ theme }) => theme.COLORS.WHITE};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.COLORS.DANGER_HOVER};
  }
`;

export const SaveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: ${({ theme }) => theme.COLORS.SUCCESS};
  color: ${({ theme }) => theme.COLORS.WHITE};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.COLORS.SUCCESS_HOVER};
  }
`;

export const CancelButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: ${({ theme }) => theme.COLORS.GRAY_200};
  color: ${({ theme }) => theme.COLORS.GRAY_800};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.COLORS.GRAY_300};
  }
`;

export const ProductOverview = styled.div`
  background: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 16px;
  padding: 24px;
  margin-top: 18px;
  box-shadow: 0 8px 28px rgba(0,0,0,0.06);
  display: flex;
  gap: 32px;

  > div:first-child {
    flex-shrink: 0;
    width: 45%;
    max-width: 400px;
  }

  > div:last-child {
    flex-grow: 1;
  }
`;

export const InfoProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  h1 {
    font-size: 28px;
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 1.2;
    color: ${({ theme }) => theme.COLORS.GRAY_900};
  }
`;

export const ImageGalleryWrapper = styled.div`
  width: 100%;
`;

export const MainImageWrapper = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  background: ${({ theme }) => theme.COLORS.GRAY_100};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const DeleteImageButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.COLORS.WHITE};
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
  color: ${({ theme }) => theme.COLORS.DANGER};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  &:hover {
    background: ${({ theme }) => theme.COLORS.GRAY_50};
  }
`;

export const ThumbnailList = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
`;

const ThumbnailBase = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  flex-shrink: 0;
  border: 2px solid transparent;
`;

export const Thumbnail = styled(ThumbnailBase)`
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &.active {
    border-color: ${({ theme }) => theme.COLORS.BLACK};
  }
`;

export const AddThumbnailButton = styled(ThumbnailBase)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.COLORS.GRAY_50};
  border: 2px dashed ${({ theme }) => theme.COLORS.GRAY_300};
  color: ${({ theme }) => theme.COLORS.GRAY_500};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.COLORS.GRAY_100};
  }
`;

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.COLORS.GRAY_700};
  }
`;

export const InfoInput = styled.input`
  width: 100%;
  font-size: 28px;
  font-weight: 700;
  padding: 8px;
  border: 2px solid ${({ theme }) => theme.COLORS.GRAY_200};
  border-radius: 8px;
  outline: none;
  margin-bottom: 0;
  background: ${({ theme }) => theme.COLORS.WHITE};
  color: ${({ theme }) => theme.COLORS.GRAY_900};

  &:focus {
    border-color: ${({ theme }) => theme.COLORS.BLACK};
  }
`;

export const ReviewStars = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.GRAY_500};

  svg {
    color: ${({ theme }) => theme.COLORS.WARNING};
  }
`;

export const AvailabilityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;

  label {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    color: ${({ theme }) => theme.COLORS.GRAY_900};
  }
`;

export const BlackCheckbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 24px;
  height: 24px;
  border: 2px solid ${({ theme }) => theme.COLORS.GRAY_800};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:checked {
    background-color: ${({ theme }) => theme.COLORS.BLACK};
    border-color: ${({ theme }) => theme.COLORS.BLACK};
  }

  &:checked::after {
    content: '';
    width: 6px;
    height: 12px;
    border: solid ${({ theme }) => theme.COLORS.WHITE};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    position: absolute;
    top: 2px;
  }
`;

export const DescriptionText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.COLORS.GRAY_700};
  margin: 0;
`;

export const DescriptionTextarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 12px;
  font-size: 16px;
  line-height: 1.6;
  border: 2px solid ${({ theme }) => theme.COLORS.GRAY_200};
  border-radius: 8px;
  resize: vertical;
  background: ${({ theme }) => theme.COLORS.WHITE};
  color: ${({ theme }) => theme.COLORS.GRAY_700};

  &:focus {
    border-color: ${({ theme }) => theme.COLORS.BLACK};
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};

  h2 {
    margin: 0;
    font-size: 20px;
    color: ${({ theme }) => theme.COLORS.GRAY_900};
  }
`;

export const AddVariationButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: ${({ theme }) => theme.COLORS.BLACK};
  color: ${({ theme }) => theme.COLORS.WHITE};
  cursor: pointer;

  &:hover {
    opacity: 0.95;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.COLORS.GRAY_500};
  padding: 24px 0;
  font-size: 15px;
  line-height: 1.4;
`;

export const SimpleProductWarning = styled.div`
  padding: 20px;
  text-align: center;
  background: ${({ theme }) => theme.COLORS.GRAY_50};
  border-radius: 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const VariationsTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    text-align: left;
    padding: 12px 8px;
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
  }

  th {
    font-size: 14px;
    color: ${({ theme }) => theme.COLORS.GRAY_500};
  }

  td {
      color: ${({ theme }) => theme.COLORS.GRAY_700};
  }
`;

export const TableInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 2px solid ${({ theme }) => theme.COLORS.GRAY_200};
  border-radius: 6px;
  background: ${({ theme }) => theme.COLORS.WHITE};
  color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const DeleteVariationButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.COLORS.DANGER};
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: ${({ theme }) => theme.COLORS.DANGER_HOVER};
  }
`;

export const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ReviewItem = styled.div`
  padding-bottom: 20px;
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
  }
  
  p {
      color: ${({ theme }) => theme.COLORS.GRAY_600};
  }
`;

export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 16px;
    color: ${({ theme }) => theme.COLORS.GRAY_900};
  }
  
  span {
    font-size: 14px;
    color: ${({ theme }) => theme.COLORS.GRAY_500};
  }
`;
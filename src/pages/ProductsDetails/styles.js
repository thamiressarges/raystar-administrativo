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

export const PageContainer = styled.div`
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
`;

export const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Section = styled.section`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px; 
  margin-top: 18px;
  box-shadow: 0 8px 28px rgba(0,0,0,0.06);

  > h2 {
    font-size: 20px;
    margin-top: 0;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #F3F4F6;
  }
`;

export const EditButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: #374151;
  color: #fff;
  cursor: pointer;
  &:hover { opacity: .95; }
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
  &:hover { background: #DC2626; }
`;
export const SaveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: #10B981; 
  color: #fff;
  cursor: pointer;
  &:hover { background: #059669; }
`;
export const CancelButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: #eee;
  color: #333;
  cursor: pointer;
  &:hover { background: #ddd; }
`;

export const ProductOverview = styled.div`
  background: #ffffff;
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
  background: #f3f4f6;

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
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #E5E7EB;
  color: #EF4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  
  &:hover {
    background: #fff;
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
    border-color: #000;
  }
`;

export const AddThumbnailButton = styled(ThumbnailBase)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F9FAFB;
  border: 2px dashed #D1D5DB;
  color: #6B7280;
  cursor: pointer;

  &:hover {
    background: #F3F4F6;
  }
`;

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; 

  label {
    font-size: 16px;
    font-weight: 600;
    color: #374151;
  }
`;


export const InfoInput = styled.input` 
  width: 100%;
  font-size: 28px;
  font-weight: 700;
  padding: 8px;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  outline: none;
  margin-bottom: 0; 
  
  &:focus {
    border-color: #000;
  }
`;

export const ReviewStars = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #6B7280;
  margin: 0; 

  svg {
    color: #F59E0B;
  }
`;

export const AvailabilityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 0; 
  
  label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }

  span {
    font-size: 14px;
    color: #6B7280;
  }
`;

export const DescriptionText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #374151;
  margin: 0; 
`;

export const DescriptionTextarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 12px;
  font-size: 16px;
  line-height: 1.6;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  resize: vertical;
  
  &:focus {
    border-color: #000;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 20px;
  border-bottom: 1px solid #F3F4F6;

  h2 {
    margin: 0;
    font-size: 20px;
  }
`;

export const AddVariationButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: #000;
  color: #fff;
  cursor: pointer;
  &:hover { opacity: .95; }
`;

export const VariationsTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    text-align: left;
    padding: 12px 8px;
    border-bottom: 1px solid #F3F4F6;
  }

  th {
    font-size: 14px;
    color: #6B7280;
    text-transform: uppercase;
  }

  td {
    font-size: 15px;
    font-weight: 500;
  }
`;

export const TableInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 2px solid #E5E7EB;
  border-radius: 6px;
  font-size: 15px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type=number] {
    -moz-appearance: textfield;
  }
`;

export const DeleteVariationButton = styled.button`
  background: transparent;
  border: none;
  color: #EF4444;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: #DC2626;
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
    border-bottom: 1px solid #F3F4F6;
  }
`;

export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  h3 {
    margin: 0;
    font-size: 16px;
  }
  
  span {
    font-size: 14px;
    color: #6B7280;
  }
`;
import styled from "styled-components";

const width = '48px';
const height = '26px';
const circleSize = '22px';

export const SwitchContainer = styled.div`
  position: relative;
  display: inline-block;
  width: ${width};
  height: ${height};
  cursor: pointer;
  margin-left: auto;
  flex-shrink: 0;
`;

export const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

export const SwitchSlider = styled.span`
  position: absolute;
  inset: 0;
  background-color: ${({ theme, $checked }) => $checked ? theme.COLORS.PRIMARY : theme.COLORS.GRAY_300};
  transition: .4s;
  border-radius: ${height};
  
  &:before {
    position: absolute;
    content: "";
    height: ${circleSize};
    width: ${circleSize};
    left: 2px;
    bottom: 2px;
    background-color: ${({ theme }) => theme.COLORS.WHITE};
    transition: .4s;
    border-radius: 50%;
    transform: ${({ $checked }) => $checked ? `translateX(${parseInt(width) - parseInt(circleSize) - 4}px)` : 'translateX(0)'};
  }
`;
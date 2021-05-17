import styled from "styled-components";

const PageCard = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  background: #F9F7F4;
  flex-direction: ${({ isColumn }) => isColumn && "column"};
`;

export default PageCard;

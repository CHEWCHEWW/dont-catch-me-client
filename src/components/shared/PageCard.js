import styled from "styled-components";

const PageCard = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  flex-direction: ${({ isColumn }) => isColumn && "column"};
  background: #FFFFFF96;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

export default PageCard;

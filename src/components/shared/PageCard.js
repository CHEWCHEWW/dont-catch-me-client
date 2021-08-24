import styled from "styled-components";

const PageCard = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  flex-direction: ${({ isColumn }) => isColumn && "column"};
  background: ${({ theme }) => theme.White};
  box-shadow: 0 6px 6px ${({ theme }) => theme.ModalBackground};
`;

export default PageCard;

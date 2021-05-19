import styled from "styled-components";

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ color }) => color};
  align-items: center;
  justify-content: center;
`;

export default ModalContent;
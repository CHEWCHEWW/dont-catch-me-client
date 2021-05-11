import styled from "styled-components";

export default Modalview = styled.div`
  position: relative;
  padding: ${({ padding }) => padding}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 5px;
  overflow-y: scroll;
`;

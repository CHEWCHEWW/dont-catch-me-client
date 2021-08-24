import { css } from "styled-components";

export const ButtonActiveAndFocus = css`
  :active,
  :focus {
    box-shadow: 0 8px 0 #AB3C2D, 0 12px 10px ${({ theme }) => theme.ModalBackground};;
  }
`;

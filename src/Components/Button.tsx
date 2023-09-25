import { FunctionComponent } from "react";
import styled, { css } from "styled-components";

interface ButtonProps {
  label: string;
  clickHandler?: (e: any) => void;
  type?: "button" | "reset" | "submit";
  actionType: string
}

const Button: FunctionComponent<ButtonProps> = ({label, clickHandler, type, actionType}) => {
  return <StyledButton actionType={actionType} type={type} onClick={clickHandler}>{label}</StyledButton>;
};

const StyledButton = styled.button<{actionType: string}>`
  border-radius: 4px;
  padding: 14px 25px;
  border: none;
  color: #fff;
  cursor: pointer;
  ${({actionType}) => {
    switch (actionType) {
      case "edit":
        return css`
          background: #57b157;
        `;
      case "delete":
        return css`
          background: #9e3030;
        `;
      default:
        return css`
          background: tomato;
        `;
    }
  }}
`


export default Button;

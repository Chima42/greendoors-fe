import { FunctionComponent } from "react";

interface ButtonProps {
  label: string;
  clickHandler?: (e: any) => void;
  type?: "button" | "reset" | "submit";
}

const Button: FunctionComponent<ButtonProps> = ({label, clickHandler, type}) => {
  return <button type={type} onClick={clickHandler}>{label}</button>;
};

export default Button;

import { FunctionComponent } from "react";
import styled from "styled-components";

interface FormInputFieldProps {
  field: string;
  type: string;
  name: string;
  value: string;
  onChange: (event: any) => void;
}

const FormInputField: FunctionComponent<FormInputFieldProps> = ({type, name, field, value, onChange}) => {
  return <>
    <StyledText>{field}</StyledText>
    <StyledInput onChange={onChange} value={value} id={name} type={type} name={name}/>
  </>;
};

const StyledText = styled.p`
  padding: 0;
  font-size: 14px;
  margin: 0;
`;

const StyledInput = styled.input`
  border: solid 1px rgba(0,0,0,0.3);
  border-radius: 4px;
  padding: 7px;
  font-size: 13px;
`

export default FormInputField;

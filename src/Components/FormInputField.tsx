import { FunctionComponent } from "react";

interface FormInputFieldProps {
  field: string;
  type: string;
  name: string;
}

const FormInputField: FunctionComponent<FormInputFieldProps> = ({type, name, field}) => {
  return <>
    <p>{field}</p>
    <input id={name} type={type} name={name}/>
  </>;
};

export default FormInputField;

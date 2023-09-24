import { FunctionComponent } from "react";

interface FormInputFieldProps {
  field: string;
  type: string;
  name: string;
  value: string;
  onChange: (event: any) => void;
}

const FormInputField: FunctionComponent<FormInputFieldProps> = ({type, name, field, value, onChange}) => {
  return <>
    <p>{field}</p>
    <input onChange={onChange} value={value} id={name} type={type} name={name}/>
  </>;
};

export default FormInputField;

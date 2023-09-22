import { FunctionComponent } from "react";

interface FormDropdownFieldProps {
  field: string;
  name: string;
  options: string[];
}

const FormDropdownField: FunctionComponent<FormDropdownFieldProps> = ({options, name, field}) => {
  return <>
    <p>{field}</p>
    <select name={name} id={name}>
      {
        options.map(option => <option key={option} value={option}>{option}</option>)
      }
    </select>
  </>;
};

export default FormDropdownField;

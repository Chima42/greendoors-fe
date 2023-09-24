import { FunctionComponent } from "react";

interface FormDropdownFieldProps {
  field: string;
  name: string;
  options: string[];
  value: string;
  onChange: (event: any) => void;
}

const FormDropdownField: FunctionComponent<FormDropdownFieldProps> = ({onChange, value, options, name, field}) => {
  return <>
    <p>{field}</p>
    <select name={name} id={name} value={value} onChange={onChange}>
      <option disabled unselectable="on">{`Select a ${field}`}</option>
      {
        options.map(option => <option key={option} value={option}>{option}</option>)
      }
    </select>
  </>;
};

export default FormDropdownField;

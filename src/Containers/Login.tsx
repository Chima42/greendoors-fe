import { FunctionComponent, useState } from "react";
import FormInputField from "../Components/FormInputField";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";


interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  let navigate = useNavigate();
  const [nameField, setNameField] = useState("");
  const [passwordField, setPasswordField] = useState("");

  const onSubmit = () => {
    navigate("/list");
  }

  return <div>
    <FormInputField onChange={e => setNameField(e.target.value)} value={nameField} type="text" field="Name" name="name"/>
    <FormInputField onChange={e => setPasswordField(e.target.value)} value={passwordField} type="password" field="Password" name="password"/>
    <Button clickHandler={onSubmit} label="sign in" />
  </div>;
};

export default Login;

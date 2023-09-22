import { FunctionComponent } from "react";
import FormInputField from "../Components/FormInputField";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";


interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  let navigate = useNavigate();

  const onSubmit = () => {
    navigate("/list");
  }

  return <div>
    <FormInputField type="text" field="Name" name="name"/>
    <FormInputField type="password" field="Password" name="password"/>
    <Button clickHandler={onSubmit} label="sign in" />
  </div>;
};

export default Login;

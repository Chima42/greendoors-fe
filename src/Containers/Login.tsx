import { FunctionComponent, useState } from "react";
import FormInputField from "../Components/FormInputField";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  let navigate = useNavigate();
  const [nameField, setNameField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [loginFailed, setIsLoginFailed] = useState(false);

  const _name = "testuser";
  const _password = "greendoors123";

  const onSubmit = () => {
    if (_password === passwordField && nameField === _name) {
      localStorage.setItem("loggedIn", "true")
      navigate("/list");
    } else {
      setIsLoginFailed(true)
    }
  }

  return <StyledWrapper>
    <FormInputField onChange={e => setNameField(e.target.value)} value={nameField} type="text" field="Name" name="name"/>
    <FormInputField onChange={e => setPasswordField(e.target.value)} value={passwordField} type="password" field="Password" name="password"/>
    {
      loginFailed && <p style={{color: "red"}}>Login details incorrect</p>
    }
    <Button actionType="main" clickHandler={onSubmit} label="sign in" />
  </StyledWrapper>;
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: auto;
  padding: 30px;
  border-radius: 8px;
`

export default Login;

import { FunctionComponent, useEffect, useRef, useState } from "react";
import FormInputField from "../Components/FormInputField";
import FormDropdownField from "../Components/FormDropdownField";
import Button from "../Components/Button";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
// import Slider from "react-slick";
// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";

interface AddProps {}

enum ScreenState {
  Make,
  Colour,
  Code,
  Final,
}
 
const Add: FunctionComponent<AddProps> = () => {
  const [activeView, setActiveView] = useState(ScreenState.Make);
  const colours = ["blue", "red", "black", "orange"];
  const make = ["audi", "bmw", "vauxhall", "mercedes", "peugeot", "renault"];
  let location = useLocation();
  const formRef = useRef<HTMLFormElement>(null);
  const [editModeActive, setEditModeActive] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    make: "",
    colour: "",
    code: "",
    recordId: 0
  })
  let navigate = useNavigate();

  useEffect(() => {
    if (location.state !== null) {
      const {name, colour, code, make, RecordId} = location.state;
      setFormState({
        name,
        make,
        code,
        colour,
        recordId: RecordId
      })
      setEditModeActive(true)
    }
  }, [])

  const handleNext = (event: any, screenState: ScreenState) => {
    event.preventDefault();
    setActiveView(screenState);
  };
  
  const updateRecord = async () => {
    try {
      await fetch(`http://ec2-3-10-205-74.eu-west-2.compute.amazonaws.com:4000/record/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
      navigate("/add");
    } catch(e) {
      console.log(e)
      // would typicall add error handling and a user facing message on failure
    }
  }
  
  const saveRecord = async () => {
    try {
      await fetch(`http://ec2-3-10-205-74.eu-west-2.compute.amazonaws.com:4000/record/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          make: formState.make,
          colour: formState.colour,
          code: formState.code
        }),
      });
      navigate("/list");
    } catch(e) {
      console.log(e)
      // would typicall add error handling and a user facing message on failure
    }
  }

  const renderForm = () => {
    switch (activeView) {
      case ScreenState.Make:
        return (
          <FormStageWrapper>
            <FormInputField onChange={e => setFormState({
              ...formState,
              name: e.target?.value
            })} type="text" field="Name" name="name" value={formState.name} />
            <FormDropdownField options={make} field="make" name="make" value={formState.make} onChange={e => setFormState({
              ...formState,
              make: e.target?.value
            })} />
            <Button
              actionType="main"
              label="next"
              clickHandler={(e) => handleNext(e, ScreenState.Colour)}
            />
          </FormStageWrapper>
        );
      case ScreenState.Colour:
        return (
          <FormStageWrapper>
            <FormDropdownField options={colours} field="colour" name="colour" value={formState.colour} onChange={e => setFormState({
              ...formState,
              colour: e.target?.value
            })}/>
            <Button
              label="next"
              actionType="main"
              clickHandler={(e) => handleNext(e, ScreenState.Code)}
            />
          </FormStageWrapper>
        );
      case ScreenState.Code:
        return (
          <FormStageWrapper>
            <FormInputField onChange={e => setFormState({
              ...formState,
              code: e.target?.value
            })} field="code" type="text" name="code" value={formState.code} />
            <Button
              actionType="main"
              label="done"
              clickHandler={(e) => handleNext(e, ScreenState.Final)}
            />
          </FormStageWrapper>
        );
      case ScreenState.Final:
        return (
          <FormStageWrapper>
            <h2>Generated text</h2>
            <p>I have a {formState.make} and the colour is {formState.colour}.</p>
            {
              formState.colour === "red" &&
              <p>
                THE CAR IS RED! NICE!!
              </p>
            }
            <p>REF: {formState.code}</p>
            {
              editModeActive ?
            <Button actionType="main" type="button" label="update record" clickHandler={updateRecord} /> :
            <Button actionType="main" type="button" label="save" clickHandler={saveRecord} />
            }
          </FormStageWrapper>
        );

      default:
        return <></>;
    }
  };

  return (
    <Form ref={formRef}>
        {renderForm()}
    </Form>
  );
};

const FormStageWrapper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: auto;
`

const Form = styled.form`
`

export default Add;

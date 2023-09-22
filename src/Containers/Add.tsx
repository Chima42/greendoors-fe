import { FunctionComponent, useState } from "react";
import FormInputField from "../Components/FormInputField";
import FormDropdownField from "../Components/FormDropdownField";
import Button from "../Components/Button";
import styled from "styled-components";

interface AddProps {}

enum ScreenState {
  Make,
  Colour,
  Code,
  Final,
}
 
interface IFormValues {
  name: string,
  make: string,
  colour: string,
  code: string
}

const Add: FunctionComponent<AddProps> = () => {
  const [activeView, setActiveView] = useState(ScreenState.Make);
  const colours = ["blue", "red", "black", "orange"];
  const make = ["audi", "bmw", "vauxhall", "mercedes", "peugeot", "renault"];
  const [formValues, setFormValues] = useState({} as IFormValues);

  const onSubmit = (event: any) => {
    event.preventDefault();
    setFormValues({
      name: getValue(event, "name"),
      make: getValue(event, "make"),
      colour: getValue(event, "colour"),
      code: getValue(event, "code"),
    });
  };

  const getValue = (event: any, name: string) => {
    return event?.target.elements[name].value
  }

  const handleNext = (event: any, screenState: ScreenState) => {
    event.preventDefault();
    setActiveView(screenState);
  };

  const displayScreen = () => {
    switch (activeView) {
      case ScreenState.Make:
        return (
          <div>
            <FormInputField type="text" field="Name" name="name" />
            <FormDropdownField options={[]} field="make" name="make" />
            <Button
              label="next"
              clickHandler={(e) => handleNext(e, ScreenState.Colour)}
            />
          </div>
        );
      case ScreenState.Colour:
        return (
          <div>
            <FormDropdownField options={[]} field="colour" name="colour" />
            <Button
              label="next"
              clickHandler={(e) => handleNext(e, ScreenState.Code)}
            />
          </div>
        );
      case ScreenState.Code:
        return (
          <div>
            <FormInputField field="code" type="text" name="code" />
            <Button
              label="done"
              clickHandler={(e) => handleNext(e, ScreenState.Final)}
            />
          </div>
        );
      case ScreenState.Final:
        return (
          <div>
            <p>Final Screen</p>
            <Button type="submit" label="save" />
          </div>
        );

      default:
        return (
          <div>
            <FormInputField type="text" field="Name" name="make" />
            <FormDropdownField options={[]} field="make" name="make" />
          </div>
        );
    }
  };

  const generateText = () => {

  }

  // return <form onSubmit={onSubmit}> {displayScreen()}</form>;
  return (
    <Form onSubmit={onSubmit}>
      <div>
        <FormInputField type="text" field="Name" name="name" />
        <FormDropdownField options={make} field="make" name="make" />
        <Button
          label="next"
          clickHandler={(e) => handleNext(e, ScreenState.Colour)}
        />
      </div>
      <div>
        <FormDropdownField options={colours} field="colour" name="colour" />
        <Button
          label="next"
          clickHandler={(e) => handleNext(e, ScreenState.Code)}
        />
      </div>
      <div>
        <FormInputField field="code" type="text" name="code" />
        <Button
          type="submit"
          label="done"
        />
      </div>
      <div>
        <p>Generated text</p>
        <p>I have a {formValues.make} and the colour is {formValues.colour}.</p>
        {
          formValues.colour === "red" &&
          <p>
            THE CAR IS RED! NICE!!
          </p>
        }
        <p>REF: {formValues.code}</p>
        <Button label="save" />
      </div>
    </Form>
  );
};

const Form = styled.form`
  width: 400px;
  margin: auto;
  div {
    width: 400px;
    display: inline-block;
    justify-content: center;
    flex-direction: column;
  }
`

export default Add;

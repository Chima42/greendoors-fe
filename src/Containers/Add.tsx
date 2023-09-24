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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

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

  const onSubmit = (event: any) => {
    event.preventDefault();
    setFormValues(formState);
  };

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
          name: formValues.name,
          make: formValues.make,
          colour: formValues.colour,
          code: formValues.code
        }),
      });
      // setFormState(undefined)
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <Form ref={formRef} onSubmit={onSubmit}>
      <FormStageWrapper>
        {/* <Slider {...settings}> */}
          <div className="slide">
            <FormInputField onChange={e => setFormState({
              ...formState,
              name: e.target?.value
            })} type="text" field="Name" name="name" value={formState.name} />
            <FormDropdownField options={make} field="make" name="make" value={formState.make} onChange={e => setFormState({
              ...formState,
              make: e.target?.value
            })} />
            <Button
              label="next"
              clickHandler={(e) => handleNext(e, ScreenState.Colour)}
            />
          </div>
          <div className="slide">
            <FormDropdownField options={colours} field="colour" name="colour" value={formState.colour} onChange={e => setFormState({
              ...formState,
              colour: e.target?.value
            })}/>
            <Button
              label="next"
              clickHandler={(e) => handleNext(e, ScreenState.Code)}
            />
          </div>
          <div className="slide">
            <FormInputField onChange={e => setFormState({
              ...formState,
              code: e.target?.value
            })} field="code" type="text" name="code" value={formState.code} />
            <Button
              type="submit"
              label="done"
            />
          </div>
          <div className="slide">
            <p>Generated text</p>
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
            <Button label="update record" clickHandler={updateRecord} /> :
            <Button label="save" clickHandler={saveRecord} />
            }
          </div>
        {/* </Slider> */}
      </FormStageWrapper>
    </Form>
  );
};

const FormStageWrapper = styled.div`
  width: 800px;
  margin: 0 auto;
  .slick-track {
  }
`

const Form = styled.form`
`

export default Add;

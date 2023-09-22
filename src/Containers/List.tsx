import { FunctionComponent } from "react";
import Button from "../Components/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface ListProps {}

const List: FunctionComponent<ListProps> = () => {
  let navigate = useNavigate();

  const onAdd = () => {
    navigate("/add");
  }


  return <Header>
    <h2>List view</h2>
    <Button label="Add" clickHandler={onAdd} />
  </Header>;
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

export default List;

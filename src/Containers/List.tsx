import { FunctionComponent, useEffect, useState } from "react";
import Button from "../Components/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IItem } from "../Interfaces/Item";

interface ListProps {}

const List: FunctionComponent<ListProps> = () => {
  let navigate = useNavigate();
  const [items, setItems] = useState([] as IItem[]);
  const [isAuthorised, setIsAuthorised] = useState(false);

  useEffect(() => {
    if(!localStorage.getItem("loggedIn")) {
      setIsAuthorised(false)
    } else {
      setIsAuthorised(true)
    }
  }, [])

  useEffect(() => {
    getItems()
  }, [])

  const getItems = async() => {
    try {
      const response = await fetch(`http://ec2-3-10-205-74.eu-west-2.compute.amazonaws.com:4000/record/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await response.json();
      setItems(data.items)
    } catch(e) {
      console.log(e)
    }
  }

  const onAdd = () => {
    navigate("/add");
  }
  const onEdit = (index: number) => {
    navigate("/add", {
      state: items[index]
    });
  }

  const onDelete = async (id: number) => {
    try {
      await fetch(`http://ec2-3-10-205-74.eu-west-2.compute.amazonaws.com:4000/record/${id}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });
      getItems();
    } catch(e) {
      console.log(e)
    }
  }

  if(!isAuthorised) return <h2>Unauthorised</h2>

  return <PageWrapper>
    <Header>
      <h2>List view</h2>
      <Button actionType="main" label="Add" clickHandler={onAdd} />
  </Header>
  <ItemsTable>
    <tbody>
      {/* Would add loading states and empty list state in production  */}
    {
      items.map((item, index) => {
        return <tr key={item.RecordId}>
            <td>{item.name}</td>
            <td>{item.code}</td>
            <td>{item.make}</td>
            <td>{item.colour}</td>
            <td className="actions">
              <Button actionType="edit" type="button" clickHandler={() => onEdit(index)} label="edit"/>
              <Button actionType="delete" type="button" clickHandler={() => onDelete(item.RecordId)} label="delete"/>
            </td>
          </tr>
      })
    }
    </tbody>
  </ItemsTable>
  </PageWrapper>;
};

const PageWrapper = styled.div`
  padding: 50px;
`

const ItemsTable = styled.table`
  width: 100%;
  table-layout:fixed;
  border-collapse: separate; 
  border-spacing: 0 10px;
  .actions {
    display: flex;
    gap: 15px;
    justify-content: flex-end
  }
`

const Header = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  h2 {
    margin: 0;
    padding: 0;
  }
`

export default List;

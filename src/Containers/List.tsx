import { FunctionComponent, useEffect, useState } from "react";
import Button from "../Components/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IItem } from "../Interfaces/Item";

interface ListProps {}

const List: FunctionComponent<ListProps> = () => {
  let navigate = useNavigate();
  const [items, setItems] = useState([] as IItem[]);

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

  return <>
    <Header>
      <h2>List view</h2>
      <Button label="Add" clickHandler={onAdd} />
  </Header>
  <ItemsTable>
    <tbody>
    {
      items.map((item, index) => {
        return <tr key={item.RecordId}>
            <td>{item.name}</td>
            <td>{item.code}</td>
            <td>{item.make}</td>
            <td>{item.colour}</td>
            <td>
              <Button type="button" clickHandler={() => onEdit(index)} label="edit"/>
              <Button type="button" clickHandler={() => onDelete(item.RecordId)} label="delete"/>
            </td>
          </tr>
      })
    }
    </tbody>
  </ItemsTable>
  </>;
};

const ItemsTable = styled.table`
  width: 100%
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

export default List;

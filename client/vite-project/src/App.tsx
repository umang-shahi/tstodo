import {  useEffect, useState } from "react";
import axios, {AxiosResponse} from "axios";
import "./App.css";

interface ListItem {
  _id: string;
  item: string;
}

 const App:React.FC= ()=> {
  const [itemText, setItemText] = useState<string>("");

  const [listItems, setListItems] = useState<ListItem[]>([]);

  const [isUpdating, setIsUpdating] = useState<string>("");

  const [updateItemText, setUpdateItemText] = useState<string>("");





  const addItem = async (e: React.FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault();

    try {
      const res: AxiosResponse<ListItem> = await axios.post("http://localhost:5000/api/item", {
        item: itemText,
      });

      setListItems((prev) => [...prev, res.data]);
      setItemText("");
      getItemsList();
    } catch (error) {
      console.log(error);
    }
  };






  const getItemsList = async () => {
    try {
      const res: AxiosResponse<ListItem[]> = await axios.get("http://localhost:5000/api/items");
      console.log(res.data);
      setListItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItemsList();
  }, []);





  const deleteItem = async (id: string): Promise<void> => {
    try {
      const res: AxiosResponse<void> = await axios.delete(`http://localhost:5000/api/item/${id}`);
      const newListItems = listItems.filter((item) => item._id !== id);
      setListItems(newListItems);
    } catch (error) {
      console.log(error);
    }
  };



  const updateItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res: AxiosResponse<void> = await axios.put(`http://localhost:5000/api/items/${isUpdating}`, { item: updateItemText });
      console.log(res.data);
      const updatedItemIndex = listItems.findIndex((item) => item._id === isUpdating);
      const updatedItems = [...listItems];
      updatedItems[updatedItemIndex].item = updateItemText;
      setListItems(updatedItems);
      setUpdateItemText("");
      setIsUpdating("");
    } catch (error) {
      console.log(error);
    }
  };




  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e) => updateItem(e)}>
      <input className="update-new-input" type="text" placeholder="New Item" onChange={e => setUpdateItemText(e.target.value)} value={updateItemText} />
      <button className="update-new-btn" type="submit">
        Update
      </button>
    </form>
  );

  return (
    <>
      <div className="App">
        <h1>TODO TYPESCRIPT</h1>

        <form className="form" onSubmit={(e) => addItem(e)}>
          <input
            type="text"
            placeholder="Add todo Item"
            onChange={(e) => {
              setItemText(e.target.value);
            }}
            value={itemText}
          />
          <button type="submit"> Add </button>
        </form>




        <div className="todo-listItems">
          {listItems.map((curValue) => (
            <div className="todo-item" key={curValue._id}>
              {isUpdating === curValue._id ? (
                renderUpdateForm()
              ) : (
                <>
                  <p className="item-content">{curValue.item}</p>
                  <button
                    className="update-item"
                    onClick={() => setIsUpdating(curValue._id)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-item"
                    onClick={() => deleteItem(curValue._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

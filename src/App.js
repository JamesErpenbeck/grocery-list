import { useState } from "react";
import "./index.css";

const initialList = [
  { name: "Potatoes", quantity: 3, price: 1, id: crypto.randomUUID() },
  { name: "Toilet Paper", quantity: 2, price: 8.99, id: crypto.randomUUID() },
  { name: "Blueberries", quantity: 1, price: 4, id: crypto.randomUUID() },
];

export default function App() {
  const [items, setItems] = useState(initialList);

  function handleDeleteItem(id) {
    setItems(() => items.filter((item) => item.id !== id));
  }

  function handleAddItem(item) {
    setItems([...items, item]);
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  const total = items.reduce((acc, current) => acc + current.price, 0);

  return (
    <div>
      <GroceryList onDelete={handleDeleteItem} items={items} />
      {items.length > 0 && (
        <>
          <span className="list-item">Total: {`$${total}`}</span>
          <Button onClick={handleClearList}>Clear List</Button>
        </>
      )}
      <AddItemForm onAddItem={handleAddItem} />
    </div>
  );
}

function AddItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !quantity || !price) return;

    const id = crypto.randomUUID();
    const newItem = {
      name: name[0].toUpperCase() + name.slice(1),
      quantity,
      price,
      id,
    };

    onAddItem(newItem);
    setName("");
    setQuantity("");
    setPrice("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="list-item">
        <p>Add Item:</p>
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <Button>Submit</Button>
      </div>
    </form>
  );
}
function GroceryList({ items, onDelete }) {
  return (
    <div>
      {items.map((item) => (
        <ListItem onDelete={onDelete} item={item} key={item.name} />
      ))}
    </div>
  );
}

function ListItem({ item, onDelete }) {
  return (
    <div className="list-item">
      {`${item.name} | Quantity: ${item.quantity} | Price: ${item.price}`}
      <Button onClick={() => onDelete(item.id)}>Delete</Button>
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

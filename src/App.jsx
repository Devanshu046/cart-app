import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const initialItems = [
    { name: "shoes", price: 1000, count: 1 },
    { name: "laptop", price: 1500, count: 1 },
    { name: "headphones", price: 200, count: 1 },
    { name: "backpack", price: 75, count: 1 },
    { name: "smartphone", price: 800, count: 1 },
    { name: "watch", price: 250, count: 1 },
    { name: "tablet", price: 400, count: 1 },
    { name: "bicycle", price: 300, count: 1 },
    { name: "sunglasses", price: 150, count: 1 },
    { name: "gaming console", price: 500, count: 1 },
  ];
  const [items, setItems] = useState(initialItems);
  const [totalPrice, setTotalPrice] = useState(0);
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    // Reset flash after 500ms
    if (flash) {
      const timeout = setTimeout(() => {
        setFlash(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [flash]);
 
  useEffect(() => {
    calculateTotalPrice();
    setFlash(true)
  }, [items]);

  const calculateTotalPrice = () => {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i].price * items[i].count;
    }
    setTotalPrice(total);
    
  };

  

  const incrementCount = (index) => {
    const newItems = [...items];
    newItems[index].count += 1;
    setItems(newItems);

  };
  const decrementCount = (index) => {
    const newItems = [...items];
    if (newItems[index].count > 1) {
      newItems[index].count -= 1;
    }
    setItems(newItems);
   
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>serial No</td>
            <td>Item name</td>
            <td>Item Price</td>
            <td>Add Item</td>
            <td>Quantity</td>
            <td>Remove Item</td>
            <td>Total</td>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <button className="bg-gradient-to-r from-green-400 to-green-900 hover:bg-green-700 text-white font-bold rounded-full px-2  " 
                 onClick={() => incrementCount(index)}>+</button>
              </td>
              <td>{item.count}</td>
              <td>
                <button className="bg-gradient-to-r from-red-400 to-red-900 hover:bg-red-700 text-white font-bold  px-2 rounded-full" onClick={() => decrementCount(index)}>-</button>
              </td>
              <td>{item.price * item.count}</td>
            </tr>
          ))}
        </tbody>
        <thead>
          <tr className={flash ? "flash" : ""}>
            <td colSpan={6}> <h1>Total cost </h1></td>
            <td >{totalPrice}</td>
          </tr>
        </thead>
      </table>
    </>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function FruitList({ cart, setCart }) {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/fruits')
      .then(res => {
        console.log('Fetched fruits:', res.data);
        setFruits(res.data);
      })
      .catch(err => {
        console.error('Error fetching fruits:', err);
      });
  }, []);

  const addToCart = (fruit) => {
    const existingItem = cart.find(item => item.fruit._id === fruit._id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.fruit._id === fruit._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { fruit, quantity: 1 }]);
    }
  };

  return (
    <div>
      <h1>Fruit Store</h1>
      <Link to="/cart">Cart ({cart.length})</Link>
      <div className="fruit-list">
        {fruits.length === 0 ? (
          <p>No fruits available. Please check back later or contact support.</p>
        ) : (
          fruits.map(fruit => (
            <div key={fruit._id} className="fruit-item">
              <img src={fruit.image} alt={fruit.name} />
              <h3>{fruit.name}</h3>
              <p>${fruit.price}</p>
              <button onClick={() => addToCart(fruit)}>Add to Cart</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FruitList;
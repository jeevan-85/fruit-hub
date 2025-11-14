import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Cart(props) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const history = useHistory();
  const { cart, setCart } = props;

  const total = cart.reduce((sum, item) => 
    sum + item.fruit.price * item.quantity, 0);

  const handleOrder = async () => {
    const order = {
      items: cart.map(item => ({
        fruit: item.fruit._id,
        quantity: item.quantity
      })),
      phoneNumber,
      address,
      total
    };

    try {
      await axios.post('http://localhost:5000/api/orders', order);
      alert('Order placed successfully! Cash on Delivery.');
      setCart([]);
      history.push('/');
    } catch (err) {
      console.error(err);
      alert('Error placing order');
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      {cart.map(item => (
        <div key={item.fruit._id}>
          <h3>{item.fruit.name}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.fruit.price * item.quantity}</p>
        </div>
      ))}
      <h2>Total: ${total}</h2>
      
      <div>
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <textarea
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button onClick={handleOrder}>Place Order (Cash on Delivery)</button>
      </div>
    </div>
  );
}

export default Cart;
import { useEffect, useState } from 'react'
import './App.css'

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };


function App() {

  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(0);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const offerTarget = 1000;
  const balance = Math.max(0, offerTarget - subtotal);

  useEffect(() => {
    const hasGift = cartItems.some(item => item.name === FREE_GIFT.name);

    if (subtotal >= offerTarget && !hasGift) {
      setCartItems([...cartItems, { ...FREE_GIFT, quantity: 1 }]);
    }

    if (subtotal < offerTarget && hasGift) {
      setCartItems(cartItems.filter(item => item.name !== FREE_GIFT.name));
    }
  }, [subtotal]);

  const addToCart = (product) => {
    const existingProduct = cartItems.find(item => item.name === product.name);
    if (existingProduct) {
      setCartItems(cartItems.map(item => item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  const increment = (name) => {
    setCartItems(cartItems.map(item => item.name === name ? { ...item, quantity: item.quantity + 1 } : item));
  }

  const decrement = (name) => {
    setCartItems(prevItems =>
      prevItems
        .map(item =>
          item.name === name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0 || item.name === FREE_GIFT.name) 
    );
  };
  

  const remove = (name) => {
    setCartItems(cartItems.filter(item => item.name !== name));
  }


  return (
    <div className='main'>
      <div className='container'>
        <h1>Shoping Cart</h1>
        <h3 className='title'>Products</h3>
        <div className='product'>
          {
            PRODUCTS.map(product => (
              <div key={product.name} className='product-card'>
                <h1>{product.name}</h1>
                <p>₹{product.price}</p>
                <button className='btn-cart' onClick={() => addToCart(product)}>Add To Cart</button>
              </div>
            ))
          }
        </div>
        <h3 className='title'>Cart Summary</h3>

        <div className='summary'>
          <p><strong>Subtotal:</strong>₹{subtotal}</p>
          {subtotal >= offerTarget ? (
            <p className='gift'> Free {FREE_GIFT.name} gift unlocked </p>
          ) : (
            <p className='text'>Add ₹{balance} more to get a FREE Wireless Mouse!</p>
          )}
          <div className='progress-bar'>
            <div style={{ width: `${(subtotal / offerTarget) * 100}%` }}></div>
          </div>
        </div>

        <div className='cart-items'>
          <h3 className='title'>Cart Items</h3>
          {cartItems.length !== 0 ? (
            cartItems.map(item => (
              <div className='cart-item' key={item.name}>
                <div>
                  <strong>{item.name}</strong>
                  <p>₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}</p>
                </div>

                {item.name === FREE_GIFT.name ? (
                  <span className="free-gift-badge">FREE GIFT</span>
                ) : (
                  <div className='qty-buttons'>
                    <button onClick={() => decrement(item.name)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increment(item.name)}>+</button>
                  </div>
                )}

                {item.name !== FREE_GIFT.name && (
                  <button className='remove' onClick={() => remove(item.name)}>Remove</button>
                )}
              </div>
            ))
          ) : (
            <p>Your Cart is Empty</p>
          )}

        </div>
      </div>
    </div>
  )
}

export default App

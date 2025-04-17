import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };


function App() {

  const [cartItems,setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(0);

  const addToCart = (product) => {
    const existingProduct = cartItems.find(item => item.name === product.name);
    if(existingProduct){
      setCartItems(cartItems.map(item => item.name === product.name ? {...item, quantity: item.quantity + 1} : item));
    }else{
      setCartItems([...cartItems, {...product, quantity: 1}]);
    }
  }

  const increment = (name) =>{
    setCartItems(cartItems.map(item=>item.name===name? {...item, quantity:item.quantity + 1}: item));
  }

  const decrement = (name) =>{
    setCartItems(cartItems.map(item=>item.name===name && item.quantity>1? {...item, quantity:item.quantity - 1}: item));
  }

  const remove = (name) =>{
    setCartItems(cartItems.filter(item => item.name !== name));
  }

  const subtotal = cartItems.reduce((acc,item) => acc+item.price * item.quantity,0);
  const offerTarget = 1000;
  const balance = Math.max(0, offerTarget - subtotal);


  return (
    <div className='container'>
      <h1>Shoping Cart</h1>
      <div className='product'>
        {
          PRODUCTS.map(product=>(
            <div key={product.name} className='product-card'>
              <h1>{product.name}</h1>
              <p>${product.price}</p>
              <div className='qty-buttons'>
              </div>
              <button onClick={()=>addToCart(product)}>Add To Cart</button>
            </div>
          ))
        }
      </div>

      <div className='summary'>
        <h3>Cart Summary</h3>
        <p><strong>Subtotal:</strong>${subtotal}</p>
        {subtotal >= offerTarget ? (
          <p className='gift'> Free {FREE_GIFT.name} gift unlocked </p>
        ): (
          <p className='text'>
            Add ${balance} more to Get Free Wireless Mouse
          </p>
        )}
        <div className='progress-bar'>
          <div style={{width: `${(subtotal / offerTarget)*100}%`}}></div>
        </div>
      </div>

      <div className='cart-items'>
        <h3>Cart Items</h3>
        {cartItems.length!==0? (
          cartItems.map(item => (
            <div className='cart-item' key = {item.name}>
              <span>{item.name}</span>
              <span>{item.price}</span>
              <div className='qty-buttons'>
                <button onClick={()=>decrement(item.name)}>-</button>
                <span>{quantity}</span>
                <button onClick={()=>increment(cartItems.name)}>+</button>
              </div>
              <button className='remove' onClick={()=>remove(item.name)}>Remove</button>
            </div>
          ))
        ): (
          <p>Your Cart is Empty</p>
        )}
      </div>
    </div>
  )
}

export default App

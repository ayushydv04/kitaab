import { createContext } from "react";
import { getPost } from "../api/PostApi";
import { useEffect } from "react";
import { useState } from'react'
import {useNavigate } from 'react-router-dom'
import axios from "axios";
import { toast } from 'react-toastify'


export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [token, setToken] = useState('')

  


  // For bringing data from backend and saving in products useState

  const [products, setProducts] = useState([]);

  
  const getPostData = async () => {
    try {
      
      const res = await axios.get(backendUrl + '/api/product/list')
      if(res.data.success){
        setProducts(res.data.products);
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  

  // Ends here




  // For Search box functionality and search box
  const [search, setSearch] = useState('')

  // when this will be true we'll show search box otherwise not
  const [showSearch, setShowSearch] = useState(false)


  // Making add to cart functionality
  const [cartItems, setCartItems] = useState({})

  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);

    if(cartData[itemId]){
      cartData[itemId] += 1;
    }
    else{
      cartData[itemId] = 1;
    }

    setCartItems(cartData);

    if(token){
      try {
        await axios.post(backendUrl + '/api/cart/add', {itemId}, {headers:{token}})
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
      }
    }

  }


  const getCartCount = () => {
    let totalCount = 0;
    for(const items in cartItems){
      totalCount += cartItems[items];
    }
    return totalCount;
  }

  useEffect(()=>{
    
  }, [cartItems])


  // Update quantity or delete item from cart
  const updateQuantity = async (itemId, quantity) => {
    const cartData = { ...cartItems };
    if (quantity > 0) {
      cartData[itemId] = quantity;
    } else {
      delete cartData[itemId]; // Remove item if quantity is 0
    }
    setCartItems(cartData);

    if(token){
      try {
        await axios.post(backendUrl + '/api/cart/update', {itemId, quantity}, {headers:{token}})
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
      }
    }
  };

  const getUserCart = async (token) =>{
    try {
      const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers:{token}})
      if(response.data.success){
        setCartItems(response.data.cartData)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  
  const getCartAmount = () => {
    let totalAmount = 0;
  
    for (const itemId in cartItems) {
      // Ensure itemId is converted to the same type as pId, assuming pId is a number
      const itemInfo = products.find((product) => product.pId === Number(itemId));
  
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[itemId];
      }
    }
  
    return totalAmount;
  };


  useEffect(()=>{
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'))
    }
  })
 
  

  const currency = "₹";
  const delivery_fee = 10;

  const navigate = useNavigate()

  const value = {
    products,
    currency,
    delivery_fee,
    search, setSearch, showSearch, setShowSearch, 
    cartItems, addToCart, getCartCount, setCartItems,
    updateQuantity, getCartAmount, navigate, backendUrl, token, setToken
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;

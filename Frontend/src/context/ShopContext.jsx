import { createContext } from "react";
import { getPost } from "../api/PostApi";
import { useEffect } from "react";
import { useState } from'react'


export const ShopContext = createContext();

const ShopContextProvider = (props) => {


  // For bringing data from backend and saving in products useState

  const [products, setProducts] = useState([]);

  const getPostData = async () => {
    const res = await getPost();
    setProducts(res.data);
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

  }


  const getCartCount = () => {
    let totalCount = 0;
    for(const items in cartItems){
      totalCount += cartItems[items];
    }
    return totalCount;
  }

  useEffect(()=>{
    console.log(cartItems);
    
  }, [cartItems])


  // Update quantity or delete item from cart
  const updateQuantity = (itemId, quantity) => {
    const cartData = { ...cartItems };
    if (quantity > 0) {
      cartData[itemId] = quantity;
    } else {
      delete cartData[itemId]; // Remove item if quantity is 0
    }
    setCartItems(cartData);
  };


  const getCartAmount = () => {
    let totalAmount = 0;
  
    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product.pId === itemId);
      
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[itemId]; // Multiply price by quantity in cartItems
      }
    }
  
    return totalAmount;
  };
  

 
  



  const currency = "₹";
  const delivery_fee = 10;

  const value = {
    products,
    currency,
    delivery_fee,
    search, setSearch, showSearch, setShowSearch, 
    cartItems, addToCart, getCartCount,
    updateQuantity, getCartAmount
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;

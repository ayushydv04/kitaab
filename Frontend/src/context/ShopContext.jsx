import { createContext } from "react";
import { getPost } from "../api/PostApi";
import { useEffect } from "react";
import { useState } from'react'


export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);

  const getPostData = async () => {
    const res = await getPost();
    setProducts(res.data);
  };

  useEffect(() => {
    getPostData();
  }, []);



  const currency = "₹";
  const delivery_fee = 10;

  const value = {
    products,
    currency,
    delivery_fee,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;

import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from './Title';
import ProductItem from "./ProductItem";
import { useState } from "react";


const LatestCollection = () => {
   

    
    const { products } = useContext(ShopContext);

    const [latestProducts, setLatestProducts] = useState([])
    
    useEffect(() => {
        const latest = products.slice(0, 5);
        setLatestProducts(latest);
    }, [products])
    

    
  return (

  <div className="my-10">
    <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"}/>
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, asperiores?</p>
    </div>

    {/* grid grid-cols-2 sm:grid-col-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 */}
    {/* bg-yellow-500 w-[80%] flex gap-x-10 gap-y-8 flex-wrap mx-auto */}
    {/* Rendering products */}
    <div className="flex gap-x-14 gap-y-10 justify-center flex-wrap mt-24 ">
        {
            latestProducts.map((item, index) => (
                <ProductItem key={index} item={item} />
            ))
        }
    </div>

  </div>
  ) 
}

export default LatestCollection;

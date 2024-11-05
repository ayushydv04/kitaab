import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link, useParams } from 'react-router-dom';
import { CiCirclePlus } from "react-icons/ci";


const AllProductsShow = ({item}) => {

  const { pId, imageUrl, name, description, price } = item;

  const { products, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);

  // Function to fetch product data based on id
  const fetchProductData = async (id) => {
    const foundProduct = products.find((product) => product.pId === id);

    if (foundProduct) {
      setProductData(foundProduct);
      console.log("Product Details:", foundProduct); // Log the found product data
    } else {
      console.log("Product not found");
    }
  };

  // Handle the plus icon click
  // Handle the plus icon click
  
    

  return (
    <div className='w-44 bg-gray-100 rounded-lg  gap-5 overflow-hidden'>
        <div className='w-44 h-40 overflow-hidden '>
          <img className='rounded-lg hover:scale-110 transition ease-in-out object-cover w-full h-full' src={imageUrl} alt="" />
        </div>
        <div className='p-2'>

        <p className='pt-4 pb-1 text-sm text-black'>{name}</p>
        <p className='overflow-hidden line-clamp-2 min-h-6 text-xs'>{description}</p>
        <div className="flex justify-between pr-1 mt-3 ">
            <p className='hover:scale-110 transition ease-in-out text-sm font-medium'>{price}</p>
            <CiCirclePlus onClick={() => addToCart(pId)} className='hover:scale-110 transition ease-in-out' size={"1.5em"} color='#4aab47' />
        </div>
        </div>
    </div>
  )
}

export default AllProductsShow

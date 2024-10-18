import React, { useContext } from 'react'
import {ShopContext} from '../context/ShopContext'
import Title from './Title';
import { useState, useEffect } from 'react';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const { products } = useContext(ShopContext);

    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller))
        setBestSeller(bestProduct.slice(0, 5))
    }, [products])

    console.log(bestSeller);
    // error hai

  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={"BEST"} text2={"SELLER"}/>
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, asperiores?</p>
        </div>

        {/* Rendering products */}
    <div className="flex gap-x-14 gap-y-10 justify-center flex-wrap mt-24 ">
        {
            bestSeller.map((item, index) => (
                <ProductItem key={index} item={item} />
            ))
        }
    </div>
      
    </div>
  )
}

export default BestSeller

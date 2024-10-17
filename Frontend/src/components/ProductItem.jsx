import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';
import { CiCirclePlus } from "react-icons/ci";


const ProductItem = ({item}) => {

    const {imageUrl, name, description, price} = item;

    const {currency} = useContext(ShopContext);

  return (

    <div className='w-60 bg-gray-100 rounded-lg  gap-5 overflow-hidden'>
        <div className='w-54 h-60 overflow-hidden '>
          <img className='rounded-lg hover:scale-110 transition ease-in-out object-cover w-full h-full' src={imageUrl} alt="" />
        </div>
        <div className='p-2'>

        <p className='pt-4 pb-1 text-sm text-black'>{name}</p>
        <p className='overflow-hidden line-clamp-2 min-h-6 text-xs'>{description}</p>
        <div className="flex justify-between pr-1 mt-3 ">
            <p className='hover:scale-110 transition ease-in-out text-sm font-medium'>{price}</p>
            <CiCirclePlus className='hover:scale-110 transition ease-in-out' size={"1.5em"} color='#4aab47' />
        </div>
        </div>
    </div>




    // <div className="w-56 h-60 bg-blue-100 rounded-md">
    //   <div className="flex justify-center">
    //     <div className="w-52 h-40 bg-red-300 mt-2">
    //       <img src={imageUrl} alt="" className="object-cover w-full h-full" />
    //     </div>
    //   </div>

    //   <div className="p-2 font-mono font-semibold">
    //     <h3>{name}</h3>
    //     <h3 className="overflow-hidden line-clamp-2 min-h-12">{description}</h3>
    //     <div className="flex justify-between pr-1 mt-3">
    //       <h3>{currency}{price}</h3>
    //       <button className="bg-green-500 w-16 rounded-full text-white text-md font-normal">Buy</button>
    //     </div>
    //   </div>
    // </div>
  )
}

export default ProductItem

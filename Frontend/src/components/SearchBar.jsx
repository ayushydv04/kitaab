import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const { search, setSearch,  showSearch, setShowSearch } = useContext(ShopContext);

    const [visible, setVisible] = useState(false)

    // now i want ki sear ch bar sirf collection page pr he dikhe baki harr page pr wo hidden rhe toh uske liye i'll use useLocation hook

    const location = useLocation();
    
    useEffect(()=>{
        if(location.pathname.includes('collection') && showSearch){
            setVisible(true);
        }
        else{
            setVisible(false);
        }
        
    }, [location, showSearch])

  return showSearch  && visible ? (
    <div className='border-t border-b bg-gray-50 text-center flex items-center justify-center'>
        <div className='flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3  rounded-full w-3/4 sm:w-1/2'>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm my-auto' type="text" placeholder='Search'/>
            <FiSearch className="w-4 cursor-pointer" />
        </div>
        <MdClose onClick={()=>setShowSearch(false)} className="inline w-4 cursor-pointer" />
    </div>
  ) : null;
}

export default SearchBar

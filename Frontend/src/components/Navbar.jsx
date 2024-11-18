import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

// ICONS
import { FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import { CiMenuFries } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const { showSearch, setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    
  }

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to='/'> <p className="w-36 font-bold text-2xl">Kitaab.com</p> </Link>
      {/* <img src="" className="w-36 font-bold " alt="Kitaab.com" /> */}

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700 items-center justify-center">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <FiSearch onClick={()=>setShowSearch(true)} className="w-5 h-5 cursor-pointer" />

        <div className="group relative">
          <CgProfile onClick={()=>token ? null : navigate('/login')} className="w-5 h-5 cursor-pointer" />
            {/* Dropdown menu */}
          {token &&
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profle</p>
              <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black">Order</p>
              <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
          }
        </div>

        <Link to="/cart" className="relative">
          <IoCartOutline className="w-6 min-w-6 h-6 cursor-pointer" />
          <p className="absolute right-[-5px] bottom-[-2px] w-4 h-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        <CiMenuFries
          onClick={() => setVisible(true)}
          className="w-6 h-6 cursor-pointer sm:hidden"
        />
      </div>

      {/* Side bar menu for small screen */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div onClick={()=>setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
            <MdClose className="h-4 rotate-180" />
            <p>Back</p>
          </div>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

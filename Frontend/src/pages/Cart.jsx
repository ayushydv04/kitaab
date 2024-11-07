import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)

  const [cartData, setCartData] = useState([])

  useEffect(()=>{

    const tempData = [];
    for (const items in cartItems) {
        if(cartItems[items] > 0){
          tempData.push({
            pId: items,
            quantity: cartItems[items]
          })
        }
        
    }

    setCartData(tempData);
    
    

  }, [cartItems])

  // console.log(products.pId);

  // Handle quantity change for controlled input
  const handleQuantityChange = (pId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(pId, newQuantity);
    } else {
      updateQuantity(pId, 0); // Delete item if quantity is 0
    }
  };
  

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.length === 0 ? (
          <h1>Please select a product</h1>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find((prod) => prod.pId == item.pId)   // can use == to avoid converting to string ot parseInt

            if (!productData) {
              return <h1 key={index}>Please select a valid product</h1>
            }

            return (
              <div
                key={item.pId}  
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 "
              >
                <div className="flex items-start gap-6">

                  <div className=' w-20 h-20 ml-10 sm:w-20 rounded-sm overflow-hidden'>
                    <img className="object-cover w-full h-full" src={productData.imageUrl} alt="" />
                  </div>

                  <div>
                    <p className="text-xs sm:text-large font-bold mt-3 mb-2">{productData.name}</p>
                    <p>{currency} {productData.price}</p>

                  </div>

                </div>
                <input className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} onChange={(e) => handleQuantityChange(item.pId, parseInt(e.target.value))} />
                <RiDeleteBin6Line onClick={() => handleQuantityChange(item.pId, 0)} size={"1.2em"} className='w-5 mr-4 sm:w-5 cursor-pointer' />
              </div>
            )
          })
        )}


        <div className='flex justify-end my-20'>
          <div className='w-full sm:w-[450px]'> 
            <CartTotal/>
            <div className='w-full text-end'>
              <button onClick={()=>navigate("/place-order")} className='bg-black text-white text-sm my-8  px-7 py-2'>
                PROCEED TO CHECKOUT
                {/* <span className='ml-2 font-bold'>${cartData.reduce((acc, curr) => acc + curr.quantity * productData.price, 0)}</span> */}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart

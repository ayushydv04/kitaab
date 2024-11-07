import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import stripeimg from '../assets/stripe.png'
import razorpayimg from '../assets/razorpay.png'
import { ShopContext } from '../context/ShopContext'


const PlaceOrder = () => {

  const [method, setmethod] = useState('cod');

  const { navigate } = useContext(ShopContext)

  

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-52 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ------------------- Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>

        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full'  type="text" placeholder='First name' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full'  type="text" placeholder='Last name' />
        </div>

        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full'  type="email" placeholder='Email address' />
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full'  type="text" placeholder='Street' />

        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full'  type="text" placeholder='City' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full'  type="text" placeholder='State' />
        </div>
        
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full'  type="number" placeholder='Zipcode' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full'  type="text" placeholder='Country' />
        </div>

        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full'  type="number" placeholder='Phone No.' />

      </div>

      {/* Right side */}

      <div className='mt-8'>

        <div className='mt-8 min-w-80'>
          <CartTotal/>
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          {/* Payment Method Selection*/}
          <div className=' flex gap-3 flex-col lg:flex-row justify-between flex-wrap'>
              <div onClick={()=>setmethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                <img className='h-5 mx-4' src={stripeimg} alt="" />
              </div>
              <div onClick={()=>setmethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                <img className='h-5 mx-4' src={razorpayimg} alt="" />
              </div>
              <div onClick={()=>setmethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
              </div>
              <div onClick={()=>setmethod('upi')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'upi' ? 'bg-green-400' : ''}`}></p>
                <p className='text-gray-500 text-sm font-medium mx-4'>UPI</p>
              </div>
          </div>
            
          <div className='w-full text-end mt-2'>
            <button onClick={()=>navigate('/orders')} className='bg-black text-white text-sm my-8  px-12 py-2'>PLACE ORDER</button>

          </div>

        </div>

      </div>
      
    </div>
  )
}

export default PlaceOrder

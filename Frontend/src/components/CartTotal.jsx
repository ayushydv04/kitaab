import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
    const cartAmount = getCartAmount();
    
    // State for discounts
    const [mrpDiscount, setMrpDiscount] = useState(100); // 10% off as an example
    const [couponCode, setCouponCode] = useState('');
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [showCouponField, setShowCouponField] = useState(false);
    
    // MRP Discount Calculation
    const discountAmount = (cartAmount * mrpDiscount) / 100;

    // Apply coupon discount if the code matches
    const applyCoupon = () => {
        if (couponCode === 'SAVE10') { // Example coupon code
            setCouponDiscount(10); // e.g., 20 currency units off
        } else {
            setCouponDiscount(0); // Reset if invalid
        }
    };

    // Remove coupon discount and hide field
    const removeCoupon = () => {
        setCouponCode('');
        setCouponDiscount(0);
        setShowCouponField(false);
    };

    // Show the coupon input field again
    const showCouponInput = () => setShowCouponField(true);

    // Total amount calculation
    const totalAmount = Math.max(0, cartAmount - discountAmount - couponDiscount + (cartAmount === 0 ? 0 : delivery_fee));

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1='CART' text2='TOTAL' />
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency} {cartAmount.toFixed(2)}</p>
                </div>
                
                <div className='flex justify-between'>
                    <p>MRP Discount ({mrpDiscount}%)</p>
                    <p>-{currency} {discountAmount.toFixed(2)}</p>
                </div>

                <hr />
                
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{currency} {delivery_fee.toFixed(2)}</p>
                </div>

                {showCouponField ? (
                    <>
                        <div className='flex justify-between'>
                            <p>Coupon Discount</p>
                            <p>-{currency} {couponDiscount.toFixed(2)}</p>
                        </div>

                        <div className='flex items-center gap-24 mt-2'>
                            <div>

                            <input
                                type="text"
                                placeholder="Enter coupon code"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                className='border p-1 text-sm w-[250px] mr-1'
                                />
                            <button onClick={removeCoupon} className='text-gray-500'>
                                🗑️ {/* Emoji as a bin icon */}
                            </button>
                            </div>
                            <button
                                onClick={applyCoupon}
                                className='bg-black rounded-sm text-white p-1 w-20 text-sm '
                            >
                                Apply
                            </button>
                            
                        </div>
                    </>
                ) : (
                    <p className="text-blue-500 cursor-pointer mt-2" onClick={showCouponInput}>
                        Have a coupon?
                    </p>
                )}

                <hr />
                
                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{currency} {totalAmount.toFixed(2)}</b>
                </div>
            </div>
        </div>
    );
};

export default CartTotal;

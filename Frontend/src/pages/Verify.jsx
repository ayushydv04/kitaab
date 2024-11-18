import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useSearchParams } from 'react-router-dom';

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    // Trigger payment verification as soon as component loads
    if (success && orderId) {
      verifyPayment();
    } else {
      toast.error('Invalid payment details.');
      navigate('/cart');
    }
  }, [success, orderId, navigate]);

  const verifyPayment = async () => {
    try {
      if (!token) {
        toast.error('User is not authenticated.');
        navigate('/login');
        return;
      }

      console.log('Verifying payment with orderId:', orderId); // Debugging

      const response = await axios.post(
        backendUrl + '/api/order/verifyStripe',
        { success, orderd },
        { headers: { token } }
      );

      if (response.data.success) {
        // Clear the cart after successful payment verification
        console.log('Payment successful, clearing cart.'); // Debugging
        setCartItems({});
        navigate('/orders');
      } else {
        toast.error('Payment verification failed.');
        console.log('Payment verification failed.'); // Debugging
        navigate('/cart');
      }
    } catch (error) {
      console.error('Error during payment verification:', error);
      toast.error('Something went wrong during payment verification.');
      navigate('/cart');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl">Verifying Payment...</h2>
        <p>Please wait while we confirm your payment.</p>
      </div>
    </div>
  );
};

export default Verify;

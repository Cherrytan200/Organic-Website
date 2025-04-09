import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import CheckoutForm from './CheckoutForm.jsx';

const stripePromise = loadStripe('pk_test_51QtjfJCsnghotmrYUMst49q0fwTIwnUruPFzVlqS57lUkCWZDmO2YaeRd3prvej1WAspaXGuR8e1W7eGdkymLcqc007gvCJ18H');

const Stripe = ({ price, orderId }) => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Automatically create payment intent when component mounts
    const createPaymentIntent = async () => {
      try {
        const { data } = await axios.post(
          'http://localhost:5000/api/order/create-payment',
          { price },
          { withCredentials: true }
        );
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error creating payment:', error.response?.data || error.message);
      }
    };

    if (price) {
      createPaymentIntent();
    }
  }, [price]);

  const appearance = {
    theme: 'stripe'
  };

  const options = {
    appearance,
    clientSecret
  };

  return (
    <div className="mt-4">
      {
        clientSecret ? (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm orderId={orderId} />
          </Elements>
        ) : (
          <div>Loading payment gateway...</div>
        )
      }
    </div>
  );
};

export default Stripe;

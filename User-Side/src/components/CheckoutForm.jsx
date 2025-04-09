import { useState } from 'react';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

const CheckoutForm = ({ orderId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const paymentElementOptions = {
    layout: 'tabs'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:5173/order/confirm'
        }
    })

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message);
      } else {
        setMessage('An unexpected error occurred.');
      }
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="px-10 py-[6px] rounded-sm hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white"
      >
        <span id="button-text">
          {isLoading ? 'Loading…' : 'Pay Now'}
        </span>
      </button>
      {message && <div className="mt-2 text-red-500">{message}</div>}
    </form>
  );
};

export default CheckoutForm;

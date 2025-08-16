import React from 'react';
import { useNavigate } from 'react-router-dom'; // Agar aap react-router use karte hain
import { useDispatch } from "react-redux";
import { clearCart } from '../Store/CartAction';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoHome = () => {
    dispatch(clearCart());
    navigate('/'); // yahan '/' ko apne home page route se replace kar sakte hain
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Payment Successful!</h1>
      <p style={styles.message}>Thank you for your payment. Your transaction has been completed successfully.</p>
      <button style={styles.button} onClick={handleGoHome}>
        Go to Home
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    color: 'green',
    marginBottom: '20px',
  },
  message: {
    fontSize: '18px',
    marginBottom: '30px',
    color:'white'
  },
  button: {
    backgroundColor: 'green',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

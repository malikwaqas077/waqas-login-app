"use client";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation"; // Use next/router for navigation
import styles from './LoginForm.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showTokenMessage, setShowTokenMessage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Immediately redirect if token is present and valid
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    }
  }, []);

  // Function to verify token
  const verifyToken = async (token: string) => {
    try {
      const response = await fetch('/api/profile', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        router.push('/profile');
      }
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('token', token);
      setShowTokenMessage(true); // Show token saved message
      setTimeout(() => {
        setShowTokenMessage(false); // Hide message after 1 second
      }, 1000);
      router.push('/profile'); // Use router.push to navigate
    } else {
      alert('Failed to login. Try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h1>Connexin Login</h1>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username" 
          required 
          className={styles.inputField}
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
          className={styles.inputField}
        />
        <button type="submit" className={styles.submitButton}>Login</button>
      </form>
      {showTokenMessage && (
        <div className={styles.tokenMessage}>Token is saved</div>
      )}
    </div>
  );
};

export default Login;

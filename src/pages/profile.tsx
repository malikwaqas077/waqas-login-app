// profile.tsx
import { useEffect, useState } from 'react';
import Router from 'next/router';
import type { NextPage } from 'next';
import styles from './profilepage.module.css';

const Profile = () => {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [showErroeMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        Router.push('/login');
        return;
      }
    
      try {
        const response = await fetch('/api/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
    
        if (response.ok) {
          console.log('API call success');
          const data = await response.json();
          setProfile(data);
        } else {
          console.log('API call failed');
          // If the response is not ok, handle the error
          const errorData = await response.json();
          console.error('API call error:', errorData);
          setShowErrorMessage(true); // Show error message
          setTimeout(() => {
            Router.push('/login'); // Redirect to login after 1 second
          }, 1000);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    
  
    fetchData();
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    Router.push('/login');
  };

  return (
    <div className={styles.profileContainer}>
      {showErroeMessage && (
        <div className={styles.errorMessage}>Invalid Token, Error Fetching Profile</div>
      )}
      <h1 className={styles.title}>Profile Page</h1>
      <div className={styles.info}>
        <p>Name: {profile.name}</p>
        <p>Email: {profile.email}</p>
      </div>
      <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
    </div>
  );
};

export default Profile;

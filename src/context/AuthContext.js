import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed!');
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const walletAddress = accounts[0];
      setUser(walletAddress);

      const message = `Sign in to Vocabulary App at ${new Date().toISOString()}`;
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, walletAddress],
      });

      if (signature) {
        setIsSignedIn(true);
      }
    } catch (error) {
      console.error('Error during wallet connection or signing:', error);
    }
  };

  const disconnectWallet = () => {
    setUser(null);
    setIsSignedIn(false);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setUser(accounts[0]);
          setIsSignedIn(false);
        } else {
          disconnectWallet();
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isSignedIn, connectWallet, disconnectWallet }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AuthButton = () => {
  const { user, isSignedIn, connectWallet, disconnectWallet } = useContext(AuthContext);

  return (
    <div className="p-4 text-center">
      {user && isSignedIn ? (
        <div>
          <p className="text-sm">
            Welcome: {user.slice(0, 6)}...{user.slice(-4)}
          </p>
          <button
            onClick={disconnectWallet}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Connect MetaMask
        </button>
      )}
    </div>
  );
};

export default AuthButton;

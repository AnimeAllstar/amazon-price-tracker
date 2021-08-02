import React, { useContext, useState } from 'react';
import configFirebase from '../firebase';
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import fetchDb from '../utils/fetchDb';

configFirebase();
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [isLoggedIn, setLogIn] = useState(false);

  const login = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const data = await fetchDb('auth/google', {
        method: 'POST',
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLogIn(true);
      setCurrentUser({ name: data.name, email: data.email });
      // TODO: update POST request to set session cookies
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setLogIn(false);
      setCurrentUser({ name: '', email: '' });
      // TODO: add fetch request to destroy session cookies
    } catch (err) {
      console.log(err);
    }
  };

  const value = {
    currentUser,
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

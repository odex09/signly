import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

export default function AuthPage({ onNavigate, initialMode = 'login' }) {
  const [isRegister, setIsRegister] = useState(initialMode === 'register');

  if (isRegister) {
    return (
      <Register 
        onNavigate={onNavigate} 
        onSwitchToLogin={() => setIsRegister(false)} 
      />
    );
  }

  return (
    <Login 
      onNavigate={onNavigate} 
      onSwitchToRegister={() => setIsRegister(true)} 
    />
  );
}

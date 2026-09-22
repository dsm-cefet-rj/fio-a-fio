import React, { createContext, useContext, useState } from 'react';
import { MOCK_USERS } from '../mocks/users';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  // 'guest' | 'user' | 'creator' | 'admin'
  const [currentRole, setCurrentRole] = useState('user');

  const currentUser = MOCK_USERS.find(u => u.role === currentRole) || {
    name: 'Visitante',
    role: 'guest',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    username: 'visitante'
  };

  const switchRole = (role) => {
    setCurrentRole(role);
  };

  return (
    <RoleContext.Provider value={{ currentRole, currentUser, switchRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);

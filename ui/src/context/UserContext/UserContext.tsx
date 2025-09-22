import React, { createContext, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/axios';
import { toast } from 'react-toastify';
import { getToken } from '../../utils/auth';
import { clearToken } from '../../utils/auth';
import type { UserContextInterface } from './UserContext.types';

const userContextInitialValues = {
  userLogin: async () => {},
  userData: undefined,
  login: false,
  userLogout: () => {},
};

export const UserContext = createContext<UserContextInterface>(
  userContextInitialValues
);

export const UserStorage = ({ children }: React.PropsWithChildren) => {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const resp = await api.get('/api/v1/accounts/me/');
      localStorage.setItem('uuid', resp.data.uuid);
      localStorage.setItem('username', resp.data.username);
      setUserData(resp.data);
      setLogin(true);
    } catch (err) {
      console.error(err);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  };

  const userLogin = async (values: object) => {
    try {
      const response = await api.post('/api/token/', values);
      localStorage.setItem('token', response.data.access);
      toast.success('Login realizado com sucesso!');
      await fetchUserData();
      navigate('/home');
    } catch (error) {
      console.error(error);
      toast.error('Usuário ou senha inválidos');
    }
  };

  const userLogout = () => {
    setLogin(false);
    clearToken();
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchUserData();
    }
  }, []);

  return (
    <UserContext.Provider value={{ userLogin, userData, login, userLogout }}>
      {children}
    </UserContext.Provider>
  );
};

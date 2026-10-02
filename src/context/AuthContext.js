import { createContext, useContext, useEffect, useState } from 'react';
import { autenticar } from '../services/authService';
import { getToken, removeToken, saveToken } from '../storage/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    getToken()
      .then(setToken)
      .catch(() => setToken(null))
      .finally(() => setCarregando(false));
  }, []);

  async function entrar(email, senha) {
    const novoToken = await autenticar(email, senha);
    try {
      await saveToken(novoToken);
    } catch {
      throw new Error('Não foi possível salvar a sessão neste aparelho.');
    }
    setToken(novoToken);
  }

  async function sair() {
    try {
      await removeToken();
    } catch {
      throw new Error('Não foi possível encerrar a sessão. Tente novamente.');
    }
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, carregando, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

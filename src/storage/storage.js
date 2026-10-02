import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@controle_medicamentos:token';

export const getToken = () => AsyncStorage.getItem(TOKEN_KEY);
export const saveToken = (token) => AsyncStorage.setItem(TOKEN_KEY, token);
export const removeToken = () => AsyncStorage.removeItem(TOKEN_KEY);

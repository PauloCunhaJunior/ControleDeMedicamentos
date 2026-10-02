import { REQRES_API_KEY } from '../config';

const LOGIN_URL = 'https://reqres.in/api/login';

export async function autenticar(email, senha) {
  if (!REQRES_API_KEY || REQRES_API_KEY.startsWith('COLOCAR_AQUI')) {
    throw new Error('Configure a chave pública do ReqRes em src/config.js.');
  }

  let response;
  try {
    response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': REQRES_API_KEY,
        'X-Reqres-Env': 'prod',
      },
      body: JSON.stringify({ email: email.trim(), password: senha }),
    });
  } catch {
    throw new Error('Não foi possível acessar a API de login. Verifique sua conexão.');
  }

  if (!response.ok) {
    if (response.status === 400 || response.status === 401) {
      throw new Error('E-mail ou senha inválidos.');
    }
    if (response.status === 403) {
      throw new Error('Chave do ReqRes inválida ou sem acesso.');
    }
    throw new Error('O login está indisponível no momento. Tente novamente.');
  }

  const data = await response.json();
  if (!data.token) {
    throw new Error('A API de login não retornou um token.');
  }
  return data.token;
}

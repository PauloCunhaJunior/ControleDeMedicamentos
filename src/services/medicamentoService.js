import { API_URL } from '../config';

function getUrl(suffix = '') {
  if (!API_URL || API_URL.startsWith('COLOCAR_AQUI')) {
    throw new Error('Configure a URL da MockAPI em src/config.js.');
  }
  return `${API_URL.replace(/\/$/, '')}${suffix}`;
}

async function requisicao(url, options, erro) {
  let response;
  try {
    response = await fetch(url, options);
  } catch {
    throw new Error('Não foi possível acessar a MockAPI. Verifique sua conexão.');
  }
  if (!response.ok) {
    throw new Error(erro);
  }
  if (response.status === 204) return null;
  return response.json();
}

export async function getMedicamentos() {
  const dados = await requisicao(getUrl(), undefined, 'Não foi possível buscar os medicamentos.');
  if (!Array.isArray(dados)) throw new Error('A MockAPI retornou uma lista inválida.');
  // O recurso público também contém registros de exemplo criados com o campo `name`.
  return dados.map((item) => ({
    ...item,
    nome: item.nome || item.name || 'Medicamento sem nome',
  })).reverse();
}

export function createMedicamento(medicamento) {
  return requisicao(
    getUrl(),
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(medicamento),
    },
    'Não foi possível cadastrar o medicamento.'
  );
}

export function deleteMedicamento(id) {
  return requisicao(
    getUrl(`/${encodeURIComponent(String(id))}`),
    { method: 'DELETE' },
    'Não foi possível excluir o medicamento.'
  );
}

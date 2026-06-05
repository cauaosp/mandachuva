const API_URL = "/api/v1";

export async function buscarClimaCidade(cidade) {
  const response = await fetch(`${API_URL}/clima/${cidade}`);
  const data = await response.json();

  return {
    status: response.status,
    data: data,
  };
}

export async function buscarMunicipios(uf) {
  const response = await fetch(`${API_URL}/cidades/${uf}`);
  const data = await response.json();

  return {
    status: response.status,
    data: data,
  };
}

export async function healthCheck() {
  const response = await fetch(`${API_URL}/health`);
  const data = await response.json();

  return { status: response.status, data: data };
}

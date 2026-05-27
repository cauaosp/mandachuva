export async function buscarCidade(nomeCidade) {
  const response = await fetch(
    `https://brasilapi.com.br/api/cptec/v1/cidade/${nomeCidade}`,
  );

  const data = await response.json();

  return data;
}

export async function buscarClima(idCidade) {
  const response = await fetch(
    `https://brasilapi.com.br/api/cptec/v1/clima/previsao/${idCidade}`,
  );

  const data = await response.json();

  return data;
}

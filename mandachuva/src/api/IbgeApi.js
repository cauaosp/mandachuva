export async function buscarCidade(nomeCidade) {
  let obj = {};

  const response = await fetch(
    `https://brasilapi.com.br/api/cptec/v1/cidade/${nomeCidade}`,
  );

  if (response.status === 404) {
    return {
      status: 404,
      message: "Cidade não encontrada!",
    };
  }

  if (!response.ok) {
    return {
      status: response.status,
      message: "Erro na requisição",
    };
  }

  const dataJson = await response.json();

  dataJson.map((item) => {
    if (item.nome.toLowerCase() == nomeCidade.toLowerCase()) {
      obj = item;
    }
  });

  return { status: 200, data: obj };
}

export async function buscarClima(idCidade) {
  const response = await fetch(
    `https://brasilapi.com.br/api/cptec/v1/clima/previsao/${idCidade}`,
  );
  console.log("buscar clima - ", response.status);

  if (response.status === 404) {
    return {
      status: 404,
      message: "Cidade não encontrada",
    };
  }

  if (!response.ok) {
    return {
      status: response.status,
      message: "Erro na requisição",
    };
  }

  const data = await response.json();

  return { status: 200, data: data };
}

export async function buscarEstado(siglaUF) {
  const response = await fetch(
    `https://brasilapi.com.br/api/ibge/municipios/v1/${siglaUF}`,
  );

  if (response.status === 400) {
    return {
      status: 400,
      message: "UF inválida. Informe a sigla com duas letras (A-Z).",
    };
  }

  if (response.status === 404) {
    return {
      status: 404,
      message: "UF não encontrada.",
    };
  }

  if (response.status === 422) {
    return {
      status: 422,
      message: "Um ou mais providers são inválidos.",
    };
  }

  if (!response.ok) {
    return {
      status: response.status,
      message: "Erro na requisição",
    };
  }

  const dataJson = await response.json();

  return { status: response.status, data: dataJson };
}

export async function buscarCoordenadas(cidade) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1&language=pt&format=json`,
  );
  console.log("buscar coordenadas - ", response.status);

  const data = await response.json();

  return data;
}

export async function buscarTemperatura(latitude, longitude) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&timezone=auto`,
  );
  console.log("buscar temperaturas - ", response.status);

  const data = await response.json();
  console.log("temperaturas:", data);

  return data;
}

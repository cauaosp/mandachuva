import { describe, test, expect } from "vitest";
import { buscarCoordenadas, buscarTemperatura } from "../src/api/OpenMeteoApi";

describe("Open Meteo", () => {
  test("Busca coordenadas Fortaleza", async () => {
    const response = await buscarCoordenadas("Fortaleza");

    expect(response.results.length).toBeGreaterThan(0);
  });

  test("Primeiro resultado possui latitude", async () => {
    const response = await buscarCoordenadas("Fortaleza");

    expect(response.results[0].latitude).toBeDefined();
  });

  test("Busca temperatura", async () => {
    const response = await buscarTemperatura(-3.73, -38.52);

    expect(response.current.temperature_2m).toBeDefined();
  });

  test("Retorna horário da medição", async () => {
    const response = await buscarTemperatura(-3.73, -38.52);

    expect(response.current.time).toBeDefined();
  });
});

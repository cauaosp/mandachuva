import { describe, test, expect } from "vitest";
import { buscarCidade, buscarEstado } from "../api/IbgeApi";

describe("Brasil API", () => {
  test("Fortaleza existe", async () => {
    const response = await buscarCidade("Fortaleza");

    expect(response.status).toBe(200);
    expect(response.data.nome).toBe("Fortaleza");
  });

  test("Cidade inexistente retorna erro", async () => {
    const response = await buscarCidade("CidadeInexistente123");

    expect(response.status).toBe(404);
  });

  test("UF CE retorna municípios", async () => {
    const response = await buscarEstado("CE");

    expect(response.status).toBe(200);
    expect(response.data.length).toBeGreaterThan(0);
  });

  test("UF inválida retorna erro", async () => {
    const response = await buscarEstado("XXYZ");

    expect(response.status).toBe(400);
  });
});

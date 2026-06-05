import { describe, test, expect } from "vitest";

const API_URL = "http://localhost:3000/api/v1";

describe("Backend API", () => {
  test("Health Check retorna healthy", async () => {
    const response = await fetch(`${API_URL}/health`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe("healthy");
  });

  test("Health Check possui timestamp", async () => {
    const response = await fetch(`${API_URL}/health`);
    const data = await response.json();

    expect(data.timestamp).toBeDefined();
  });

  test("Clima de Fortaleza retorna 200", async () => {
    const response = await fetch(`${API_URL}/clima/Fortaleza`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.cidade).toBe("Fortaleza");
  });

  test("Cidade não encontrada retorna 404", async () => {
    const response = await fetch(`${API_URL}/clima/CidadeInexistente123`);
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.erro).toBe("Cidade não encontrada");
  });

  test("Clima retorna temperatura", async () => {
    const response = await fetch(`${API_URL}/clima/Fortaleza`);
    const data = await response.json();

    expect(data.temperatura).toBeDefined();
  });

  test("Cidade inexistente retorna 404", async () => {
    const response = await fetch(`${API_URL}/clima/CidadeInexistente123`);

    expect(response.status).toBe(404);
  });

  test("UF CE retorna municípios", async () => {
    const response = await fetch(`${API_URL}/cidades/CE`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.length).toBeGreaterThan(0);
  });

  test("Primeiro município possui nome", async () => {
    const response = await fetch(`${API_URL}/cidades/CE`);
    const data = await response.json();

    expect(data[0].nome).toBeDefined();
  });

  test("UF inválida retorna 400", async () => {
    const response = await fetch(`${API_URL}/cidades/XXXX`);

    expect(response.status).toBe(400);
  });

  test("UF inexistente retorna 404", async () => {
    const response = await fetch(`${API_URL}/cidades/ZZ`);

    expect(response.status).toBe(404);
  });
});

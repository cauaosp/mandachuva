import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { buscarCidade, buscarClima, buscarEstado } from "./brasilApi.js";
import { buscarCoordenadas, buscarTemperatura } from "./openMeteoApi.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cors());
app.use(express.json());

const distPath = path.join(__dirname, "../../dist");
app.use(express.static(distPath));

app.get("/api/v1/health", async (_, res) => {
  try {
    const brasilApi = await fetch("https://brasilapi.com.br/api/ibge/uf/v1");

    const openMeteo = await fetch(
      "https://geocoding-api.open-meteo.com/v1/search?name=Fortaleza",
    );

    res.status(200).json({
      message: "healthy",
      versao: "1.0.0",
      timestamp: new Date().toISOString(),
      servicos: {
        brasilApi: brasilApi.ok ? "online" : "offline",
        openMeteo: openMeteo.ok ? "online" : "offline",
      },
    });
  } catch {
    res.status(500).json({
      message: "unhealthy",
      timestamp: new Date().toISOString(),
    });
  }
});

app.get("/api/v1/clima/:cidade", async (req, res) => {
  try {
    const cidade = req.params.cidade;

    if (!cidade?.trim()) {
      return res.status(400).json({
        erro: "Nome da cidade é obrigatório",
      });
    }

    const cidadeInfo = await buscarCidade(cidade);
    console.log("cidadeInfo", cidadeInfo);

    if (cidadeInfo.status !== 200) {
      return res.status(404).json({
        erro: "Cidade não encontrada",
      });
    }

    const clima = await buscarClima(cidadeInfo.data.id);
    console.log("clima OK: ", clima);

    const coordenadas = await buscarCoordenadas(cidade);

    if (!coordenadas?.results?.length) {
      return res.status(404).json({
        erro: "Coordenadas não encontradas",
      });
    }

    const latitude = coordenadas.results[0].latitude;
    const longitude = coordenadas.results[0].longitude;
    const elevation = coordenadas.results[0].elevation;
    const population = coordenadas.results[0].population;

    const temperatura = await buscarTemperatura(latitude, longitude);

    return res.status(200).json({
      cidade: cidadeInfo.data.nome,
      estado: cidadeInfo.data.estado,
      regiao: cidadeInfo.data.regiao,
      populacao: population,
      horario: temperatura.current?.time,
      timezone: temperatura.timezone,
      coordenadas: {
        latitude,
        longitude,
        elevation,
      },
      temperatura: temperatura.current?.temperature_2m,
      atualizado_em: clima.data?.atualizado_em,
      clima: clima.data?.clima ?? [],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro interno do servidor",
    });
  }
});

app.get("/api/v1/cidades/:uf", async (req, res) => {
  const uf = req.params.uf;

  if (!/^[A-Z]{2}$/i.test(uf)) {
    return res.status(400).json({
      erro: "UF inválida",
    });
  }

  const municipios = await buscarEstado(uf.toUpperCase());

  if (municipios.status !== 200) {
    return res.status(404).json({
      erro: "UF não encontrada",
    });
  }

  res.status(200).json(municipios.data);
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../../dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Servidor iniciado em http://${HOST}:${PORT}`);
});

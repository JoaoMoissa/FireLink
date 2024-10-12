import express from "express";
import cors from "cors";
import axios from "axios";
const PORT = 4000;

const app = express();

app.use(cors());

app.get("/search", async (req, res) => {
  const { query } = req.query;

  const URL = "https://serpapi.com/search.json";
  const apiKey =
    "89b0885a17c91a8245f9754d862b30b237ac4e393edc0757533fdcfe9f0cad15";

  try {
    const response = await axios.get(URL, {
      params: {
        q: query,
        api_key: apiKey,
        num: 10,
        engine: "google",
        google_domain: "google.com.br",
        gl: "br",
        h1: "pt-br",
      },
    });
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "ocorreu um erro ao fazer a requisição à API" });
  }
});

app.listen(PORT, () => {
  console.log(`O proxy está rodando na porta ${PORT}`);
});

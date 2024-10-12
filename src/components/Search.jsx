import { useState } from "react";
import axios from "axios";
import "../App.css";

export default function Search() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);

  const handleQuery = async (e) => {
    e.preventDefault();

    if (!query) {
      setError("Por favor, digite uma busca.");
      return;
    }

    setError(""); // Limpar erro anterior
    setLoading(true);

    try {
      const URL = "http://localhost:4000/search";
      const res = await axios.get(URL, {
        params: { query: query },
      });
      const data = res.data.organic_results || [];
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao fazer a busca");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="logo">
        <img id="campfire" src="/images/fire.png" alt="Fire" />
        <h1>FireLink</h1>
      </div>
      <form onSubmit={handleQuery}>
        <label>
          Search
          <input
            type="text"
            name="query"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </label>
        <button type="submit">Queimar</button>
      </form>

      {error && <p>{error}</p>}
      {loading && <p>Carregando...</p>}
      {results.length > 0 && (
        <ul>
          {results.map((result) => (
            <li key={result.link}>
              <a href={result.link} target="_blank" rel="noopener noreferrer">
                {result.title}
              </a>
              <p>{result.snippet}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

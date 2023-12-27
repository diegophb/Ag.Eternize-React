import { useState } from "react";
import axios from "axios";
import style from "../../styles/Home.module.css";
import { useRouter } from "next/router";

const AddDestino = () => {
  const [newDestino, setNewDestino] = useState({ nome: "", imagemUrl: "", valor: "" });
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setNewDestino({ ...newDestino, [e.target.name]: e.target.value });
  };

  const handleAddDestino = () => {
    // Validar campos obrigatórios
    if (!newDestino.nome || !newDestino.imagemUrl || !newDestino.valor) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    axios
      .post("https://localhost:7024/api/Destinos", newDestino)
      .then(() => {
        router.push("/destino");
      })
      .catch((error) => {
        setError(`Erro ao inserir destino: ${error.message}`);
      });
  };

  return (
    <div className={`container ${style.container}`}>
      <div className={`card ${style.card}`} style={{ maxWidth: "500px", margin: "0 auto" }}>
        <div className="card-body">
          <h1 className={`card-title ${style.h1}`}>Inserir Destino</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">
                Nome:
              </label>
              <input
                type="text"
                className="form-control"
                id="nome"
                name="nome"
                value={newDestino.nome}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="imagemUrl" className="form-label">
                URL da Imagem:
              </label>
              <input
                type="text"
                className="form-control"
                id="imagemUrl"
                name="imagemUrl"
                value={newDestino.imagemUrl}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="valor" className="form-label">
                Valor:
              </label>
              <input
                type="text"
                className="form-control"
                id="valor"
                name="valor"
                value={newDestino.valor}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <button type="button" className="btn btn-success" onClick={handleAddDestino}>
                Inserir Destino
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDestino;

import { useState } from "react";
import axios from "axios";
import style from "../../styles/Home.module.css";
import { useRouter } from "next/router";

const AddPacote = () => {
  const [newPacote, setNewPacote] = useState({ nome: "", valor: "" });
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setNewPacote({ ...newPacote, [e.target.name]: e.target.value });
  };

  const handleAddPacote = () => {
    // Validar campos obrigatórios
    if (!newPacote.nome || !newPacote.valor) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    axios
      .post("https://localhost:7024/api/Pacotes", newPacote)
      .then(() => {
        router.push("/pacote");
      })
      .catch((error) => {
        setError(`Erro ao inserir pacote: ${error.message}`);
      });
  };

  return (
    <div className={`container ${style.container}`}>
      <div className={`card ${style.card}`} style={{ maxWidth: "500px", margin: "0 auto" }}>
        <div className="card-body">
          <h1 className={`card-title ${style.h1}`}>Inserir Pacote</h1>
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
                value={newPacote.nome}
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
                value={newPacote.valor}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <button type="button" className="btn btn-success" onClick={handleAddPacote}>
                Inserir Pacote
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPacote;

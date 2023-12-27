import { useState, useEffect } from "react";
import axios from "axios";
import style from "../../../styles/Home.module.css";
import { useRouter } from 'next/router';

const UpdatePacote = () => {
  const [pacote, setPacote] = useState({ pacoteId: "", nome: "", valor: "" });
  const router = useRouter(); 
  const { codigo } = router.query;

  useEffect(() => {
    axios
      .get("https://localhost:7024/api/Pacotes/" + pacote.pacoteId)
      .then((response) => {
        setPacote(response.data);      
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do pacote:", error);
      });
  }, [pacote.pacoteId]);

  const handleInputChange = (e) => {
    setPacote({ ...pacote, [e.target.name]: e.target.value });
  };

  const handleUpdatePacote = () => {
    axios
      .put("https://localhost:7024/api/Pacotes/" + pacote.pacoteId, pacote)
      .then(() => {
        router.push('/pacote');    
      })
      .catch((error) => {
        console.error("Erro ao atualizar pacote:", error);
      });
  };

  return (
    <div className={`container ${style.container}`}>
      <div className={`card ${style.card}`} style={{ maxWidth: "500px", margin: "0 auto" }}>
        <div className="card-body">
          <h1 className={`card-title ${style.h1}`}>Atualizar Pacote</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="pacoteId" className="form-label">
                ID do Pacote:
              </label>
              <input
                type="text"
                name="pacoteId"
                value={pacote.pacoteId = codigo}
                onChange={handleInputChange}
                className="form-control"
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">
                Nome:
              </label>
              <input
                type="text"
                name="nome"
                value={pacote.nome}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="valor" className="form-label">
                Valor:
              </label>
              <input
                type="text"
                name="valor"
                value={pacote.valor}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <button type="button" className="btn btn-success" onClick={handleUpdatePacote}>
                Atualizar Pacote
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePacote;

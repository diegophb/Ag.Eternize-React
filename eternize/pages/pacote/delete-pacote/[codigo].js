import { useState } from "react";
import axios from "axios";
import style from "../../../styles/Home.module.css";
import { useRouter } from "next/router";

const DeletePacote = () => {
  const router = useRouter();
  const { codigo } = router.query;
  const [pacoteId, setPacoteId] = useState(codigo);

  const handleDeletePacote = () => {
    axios
      .delete("https://localhost:7024/api/Pacotes/" + pacoteId)
      .then(() => {
        router.push("/pacote");
      })
      .catch((error) => {
        alert("Erro ao excluir pacote:" + error);
      });
  };

  return (
    <div className={`container ${style.container}`}>
      <div className={`card ${style.card}`} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div className="card-body">
          <h1 className={`card-title ${style.h1}`}>Excluir Pacote</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="pacoteId" className="form-label">
                ID Pacote:
              </label>
              <input
                type="text"
                className="form-control"
                id="pacoteId"
                value={pacoteId}
                onChange={(e) => setPacoteId(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <button type="button" className="btn btn-danger" onClick={handleDeletePacote}>
                Excluir Pacote
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeletePacote;

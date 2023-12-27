import { useState } from "react";
import axios from "axios";
import style from "../../../styles/Home.module.css";
import { useRouter } from "next/router";

const DeleteDestino = () => {
  const router = useRouter();
  const { codigo } = router.query;
  const [destinoId, setDestinoId] = useState(codigo);

  const handleDeleteDestino = () => {
    axios
      .delete("https://localhost:7024/api/Destinos/" + destinoId)
      .then(() => {
        router.push("/destino");
      })
      .catch((error) => {
        alert("Erro ao excluir destino:" + error);
      });
  };

  return (
    <div className={`container ${style.container}`}>
      <div className={`card ${style.card}`} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div className="card-body">
          <h1 className={`card-title ${style.h1}`}>Excluir Destino</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="destinoId" className="form-label">
                ID Destino:
              </label>
              <input
                type="text"
                className="form-control"
                id="destinoId"
                value={destinoId}
                onChange={(e) => setDestinoId(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <button type="button" className="btn btn-danger" onClick={handleDeleteDestino}>
                Excluir Destino
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteDestino;

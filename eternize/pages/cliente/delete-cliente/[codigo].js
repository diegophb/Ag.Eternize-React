import { useState } from "react";
import axios from "axios";
import style from "../../../styles/Home.module.css";
import { useRouter } from "next/router";

const DeleteClient = () => {
  const router = useRouter();
  const { codigo } = router.query;
  const [clientId, setClientId] = useState(codigo);

  const handleDeleteClient = () => {
    axios
      .delete("https://localhost:7024/api/Clientes/" + clientId)
      .then(() => {
        router.push("/cliente");
      })
      .catch((error) => {
        alert("Erro ao excluir cliente:" + error);
      });
  };

  return (
    <div className={`container ${style.container}`}>
      <div className={`card ${style.card}`} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div className="card-body">
          <h1 className={`card-title ${style.h1}`}>Excluir Cliente</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="clientId" className="form-label">
                ID Cliente:
              </label>
              <input
                type="text"
                className="form-control"
                id="clientId"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <button type="button" className="btn btn-danger" onClick={handleDeleteClient}>
                Excluir Cliente
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteClient;

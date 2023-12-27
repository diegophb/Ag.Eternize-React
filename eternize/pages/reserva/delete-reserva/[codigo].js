import { useState } from "react";
import axios from "axios";
import style from "../../../styles/Home.module.css";
import { useRouter } from "next/router";

const DeleteReserva = () => {
  const router = useRouter();
  const { codigo } = router.query;
  const [reservaId, setReservaId] = useState(codigo);

  const handleDeleteReserva = () => {
    axios
      .delete("https://localhost:7024/api/Reservas/" + reservaId)
      .then(() => {
        router.push("/reserva");
      })
      .catch((error) => {
        alert("Erro ao excluir reserva:" + error);
      });
  };

  return (
    <div className={`container ${style.container}`}>
      <div className={`card ${style.card}`} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div className="card-body">
          <h1 className={`card-title ${style.h1}`}>Excluir Reserva</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="reservaId" className="form-label">
                ID Reserva:
              </label>
              <input
                type="text"
                className="form-control"
                id="reservaId"
                value={reservaId}
                onChange={(e) => setReservaId(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <button type="button" className="btn btn-danger" onClick={handleDeleteReserva}>
                Excluir Reserva
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteReserva;

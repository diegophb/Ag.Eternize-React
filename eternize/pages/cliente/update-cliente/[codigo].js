import { useState, useEffect } from "react";
import axios from "axios";
import style from "../../../styles/Home.module.css";
import { useRouter } from "next/router";

const UpdateClient = () => {
  const [client, setClient] = useState({ categoriaId: "", nome: "", telefone: "", email: "" });
  const router = useRouter();
  const { codigo } = router.query;

  useEffect(() => {
    // Faça uma chamada GET para a API para obter detalhes do cliente a ser atualizado
    axios
      .get("https://localhost:7024/api/Clientes/" + client.categoriaId)
      .then((response) => {
        setClient(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do cliente:", error);
      });
  }, [client.categoriaId]);

  const handleInputChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleUpdateClient = () => {
    axios
      .put("https://localhost:7024/api/Clientes/" + client.categoriaId, client)
      .then(() => {
        router.push("/cliente");
      })
      .catch((error) => {
        console.error("Erro ao atualizar cliente:", error);
      });
  };

  return (
    <div className={`container ${style.container}`}>
      <div className={`card ${style.card}`} style={{ maxWidth: "500px", margin: "0 auto" }}>
        <div className="card-body">
          <h1 className={`card-title ${style.h1}`}>Atualizar Cliente</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="id" className="form-label">
                ID do cliente:
              </label>
              <input
                type="text"
                className="form-control"
                id="id"
                name="categoriaId"
                value={client.categoriaId = codigo}
                onChange={handleInputChange}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">
                Nome:
              </label>
              <input
                type="text"
                className="form-control"
                id="nome"
                name="nome"
                value={client.nome}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="telefone" className="form-label">
                Telefone:
              </label>
              <input
                type="text"
                className="form-control"
                id="telefone"
                name="telefone"
                value={client.telefone}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={client.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <button type="button" className="btn btn-success" onClick={handleUpdateClient}>
                Atualizar Cliente
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateClient;

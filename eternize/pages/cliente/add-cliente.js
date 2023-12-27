import { useState } from "react";
import axios from "axios";
import style from "../../styles/Home.module.css";
import { useRouter } from "next/router";

const AddClient = () => {
  const [newClient, setNewClient] = useState({ nome: "", telefone: "", email: "" });
  const router = useRouter();

  const handleInputChange = (e) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  };

  const handleAddClient = () => {
    axios
      .post("https://localhost:7024/api/Clientes", newClient)
      .then(() => {
        router.push("/cliente");
      })
      .catch((error) => {
        alert("Erro ao inserir cliente:" + error);
      });
  };

  return (
    <div className={`container ${style.container}`}>
      <div className={`card ${style.card}`} style={{ maxWidth: "500px", margin: "0 auto" }}>
        <div className="card-body">
          <h1 className={`card-title ${style.h1}`}>Inserir Cliente</h1>
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
                value={newClient.nome}
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
                value={newClient.telefone}
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
                value={newClient.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <button type="button" className="btn btn-primary" onClick={handleAddClient}>
                Inserir Cliente
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClient;

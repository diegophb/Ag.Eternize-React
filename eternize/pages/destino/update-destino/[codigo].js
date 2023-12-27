import { useState, useEffect } from "react";
import axios from "axios";
import style from "../../../styles/Home.module.css";
import { useRouter } from 'next/router';

const UpdateDestino = () => {
  const [destino, setDestino] = useState({ destinoId: "", nome: "", imagemUrl: "", valor: "" });
  const router = useRouter(); 
  const { codigo } = router.query;

  useEffect(() => {
    // Faça uma chamada GET para a API para obter detalhes do destino a ser atualizado
    axios
      .get("https://localhost:7024/api/Destinos/" + destino.destinoId)
      .then((response) => {
       setDestino(response.data);      
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do Destino:", error);
      });
  }, [destino.destinoId]);

  const handleInputChange = (e) => {
    setDestino({ ...destino, [e.target.name]: e.target.value });
  };

  const handleUpdateDestino = () => {
    axios
      .put("https://localhost:7024/api/Destinos/" + destino.destinoId, destino)
      .then(() => {
        router.push('/destino');    
   
      })
      .catch((error) => {
        console.error("Erro ao atualizar destino:", error);
      });
  };

  return (
    <div className={`container ${style.container}`}>
      <div className={`card ${style.card}`} style={{ maxWidth: "500px", margin: "0 auto" }}>
        <div className="card-body">
          <h1 className={`card-title ${style.h1}`}>Atualizar Destino</h1>
          <table style={{ marginLeft: "20px" }}>
            <tbody>
              <tr>
                <td>
                  <label>ID do Destino:</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="id"
                    value={destino.destinoId = codigo}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Nome:</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="nome"
                    value={destino.nome}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Imagem URL:</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="imagemUrl"
                    value={destino.imagemUrl}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Valor:</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="valor"
                    value={destino.valor}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button onClick={handleUpdateDestino}>Atualizar Destino</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UpdateDestino;

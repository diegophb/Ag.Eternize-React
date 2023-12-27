import { useState, useEffect } from "react";
import axios from "axios";
import style from "../../../styles/Home.module.css";
import { useRouter } from 'next/router';

const UpdateReserva = () => {
  const [reserva, setReserva] = useState({ id_reserva: "", clienteId: "", pacoteId: "", destinoId: "", data_reserva: "" });
  const [clientes, setClientes] = useState([]);
  const [pacotes, setPacotes] = useState([]);
  const [destinos, setDestinos] = useState([]);
  const router = useRouter(); 
  const { codigo } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca detalhes da reserva
        const responseReserva = await axios.get(`https://localhost:7024/api/Reservas/${codigo}`);
        setReserva(responseReserva.data);

        // Busca lista de clientes
        const responseClientes = await axios.get("https://localhost:7024/api/Clientes");
        setClientes(responseClientes.data);

        // Busca lista de pacotes
        const responsePacotes = await axios.get("https://localhost:7024/api/Pacotes");
        setPacotes(responsePacotes.data);

        // Busca lista de destinos
        const responseDestinos = await axios.get("https://localhost:7024/api/Destinos");
        setDestinos(responseDestinos.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes da reserva:", error);
      }
    };

    fetchData();
  }, [codigo]);

  const handleInputChange = (e) => {
    setReserva({ ...reserva, [e.target.name]: e.target.value });
  };

  const handleUpdateReserva = () => {
    axios
      .put(`https://localhost:7024/api/Reservas/${codigo}`, reserva)
      .then(() => {
        router.push('/reserva');
      })
      .catch((error) => {
        console.error("Erro ao atualizar reserva:", error);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <form style={{ maxWidth: "500px" }}>
        <h1 className={style.h1}>Atualizar Reserva</h1>
        <div className="mb-3">
          <label htmlFor="id_reserva" className="form-label">ID da Reserva:</label>
          <input
            type="text"
            className="form-control"
            id="id_reserva"
            name="id_reserva"
            value={reserva.id_reserva}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="clienteId" className="form-label">Cliente:</label>
          <select
            className="form-select"
            id="clienteId"
            name="clienteId"
            value={reserva.clienteId}
            onChange={handleInputChange}
          >
            <option key="" value="">
              Selecione um cliente
            </option>
            {clientes.map((cliente) => (
              <option key={cliente.id_cliente} value={cliente.id_cliente}>
                {cliente.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="pacoteId" className="form-label">Pacote:</label>
          <select
            className="form-select"
            id="pacoteId"
            name="pacoteId"
            value={reserva.pacoteId}
            onChange={handleInputChange}
          >
            <option key="" value="">
              Selecione um pacote
            </option>
            {pacotes.map((pacote) => (
              <option key={pacote.id_pacote} value={pacote.id_pacote}>
                {pacote.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="destinoId" className="form-label">Destino:</label>
          <select
            className="form-select"
            id="destinoId"
            name="destinoId"
            value={reserva.destinoId}
            onChange={handleInputChange}
          >
            <option key="" value="">
              Selecione um destino
            </option>
            {destinos.map((destino) => (
              <option key={destino.id_destino} value={destino.id_destino}>
                {destino.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="data_reserva" className="form-label">Data da Reserva:</label>
          <input
            type="date"
            className="form-control"
            id="data_reserva"
            name="data_reserva"
            value={reserva.data_reserva}
            onChange={handleInputChange}
          />
        </div>
                <div className="mb-3">
          <button type="button" className="btn btn-primary" onClick={handleUpdateReserva}>Atualizar Reserva</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateReserva;

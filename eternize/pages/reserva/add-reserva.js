import { useState, useEffect } from "react";
import axios from "axios";
import style from "../../styles/Home.module.css";
import { useRouter } from "next/router";

const AddReserva = () => {
  const [newReserva, setNewReserva] = useState({
    ClienteId: "",
    DestinoId: "",
    PacoteId: "",
    data_reserva: "",
    valor_reserva: 0.0,
  });
  const [clientes, setClientes] = useState([]);
  const [destinos, setDestinos] = useState([]);
  const [pacotes, setPacotes] = useState([]);
  const router = useRouter();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get("https://localhost:7024/api/Clientes");
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar a lista de clientes:", error);
      }
    };

    const fetchDestinos = async () => {
      try {
        const response = await axios.get("https://localhost:7024/api/Destinos");
        setDestinos(response.data);
      } catch (error) {
        console.error("Erro ao buscar a lista de destinos:", error);
      }
    };

    const fetchPacotes = async () => {
      try {
        const response = await axios.get("https://localhost:7024/api/Pacotes");
        setPacotes(response.data);
      } catch (error) {
        console.error("Erro ao buscar a lista de pacotes:", error);
      }
    };

    fetchClientes();
    fetchDestinos();
    fetchPacotes();
  }, []);

  const handleInputChange = (e) => {
    setNewReserva({ ...newReserva, [e.target.name]: e.target.value });
  };

  const handleAddReserva = async () => {
    // Validar campos obrigatórios
    if (
      !newReserva.ClienteId ||
      !newReserva.DestinoId ||
      !newReserva.PacoteId ||
      !newReserva.data_reserva
    ) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    try {
      // Obter o valor do destino
      const destinoResponse = await axios.get(`https://localhost:7024/api/Destinos/${newReserva.DestinoId}`);
      const destino = destinoResponse.data;

      // Obter o valor do pacote
      const pacoteResponse = await axios.get(`https://localhost:7024/api/Pacotes/${newReserva.PacoteId}`);
      const pacote = pacoteResponse.data;

      // Calcular o valor total da reserva
      const valor_reserva = destino.valor + pacote.valor;

      // Enviar a reserva para o servidor
      await axios.post("https://localhost:7024/api/Reservas", {
        ...newReserva,
        valor_reserva: valor_reserva,
      });

      // Redirecionar para a página de reservas
      router.push("/reserva");
    } catch (error) {
      setError(`Erro ao inserir reserva: ${error.message}`);
    }
  };

  return (
    <div className={`container ${style.container}`}>
      <div className={`card ${style.card}`} style={{ maxWidth: "500px", margin: "0 auto" }}>
        <div className="card-body">
          <h1 className={`card-title ${style.h1}`}>Inserir Reserva</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form>
            <div className="mb-3">
              <label htmlFor="clienteSelect" className="form-label">
                Cliente:
              </label>
              <select
                id="clienteSelect"
                className="form-select"
                name="ClienteId"
                value={newReserva.ClienteId}
                onChange={handleInputChange}
              >
                <option value="">Selecione um cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id_cliente} value={cliente.id_cliente}>
                    {cliente.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="destinoSelect" className="form-label">
                Destino:
              </label>
              <select
                id="destinoSelect"
                className="form-select"
                name="DestinoId"
                value={newReserva.DestinoId}
                onChange={handleInputChange}
              >
                <option value="">Selecione um destino</option>
                {destinos.map((destino) => (
                  <option key={destino.id_destino} value={destino.id_destino}>
                    {destino.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="pacoteSelect" className="form-label">
                Pacote:
              </label>
              <select
                id="pacoteSelect"
                className="form-select"
                name="PacoteId"
                value={newReserva.PacoteId}
                onChange={handleInputChange}
              >
                <option value="">Selecione um pacote</option>
                {pacotes.map((pacote) => (
                  <option key={pacote.id_pacote} value={pacote.id_pacote}>
                    {pacote.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="dataInput" className="form-label">
                Data:
              </label>
              <input
                type="date"
                id="dataInput"
                className="form-control"
                name="data_reserva"
                value={newReserva.data_reserva}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <button type="button" className="btn btn-success" onClick={handleAddReserva}>
                Inserir Reserva
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReserva;

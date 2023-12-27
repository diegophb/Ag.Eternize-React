import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "../../styles/Home.module.css";
import Link from "next/link";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString("pt-BR", options);
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
};

const Home = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdditionalInfo = async (element) => {
    try {
      const clienteResponse = await axios.get(`https://localhost:7024/api/Clientes/${element.clienteId}`);
      const pacoteResponse = await axios.get(`https://localhost:7024/api/Pacotes/${element.pacoteId}`);
      const destinoResponse = await axios.get(`https://localhost:7024/api/Destinos/${element.destinoId}`);

      const clienteNome = clienteResponse.data.nome || "Cliente não disponível";
      const pacoteNome = pacoteResponse.data.nome || "Pacote não disponível";
      const destinoNome = destinoResponse.data.nome || "Destino não disponível";
      const destinoImage = destinoResponse.data.imagemUrl || "Destino não disponível";

      const valorDestino = destinoResponse.data.valor || 0;
      const valorPacote = pacoteResponse.data.valor || 0;
      const valorReserva = valorDestino + valorPacote;

      return { clienteNome, pacoteNome, destinoNome, destinoImage, valorReserva };
    } catch (error) {
      console.error("Erro ao buscar informações adicionais:", error);
      return {
        clienteNome: "Erro ao carregar informações do cliente",
        pacoteNome: "Erro ao carregar informações do pacote",
        destinoNome: "Erro ao carregar informações do destino",
        destinoImage: "Erro ao carregar informações do destino",
        valorReserva: 0,
      };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7024/api/Reservas");
        const reservasWithInfo = await Promise.all(response.data.map(async (element) => {
          const info = await fetchAdditionalInfo(element);
          return { ...element, ...info };
        }));
        setReservas(reservasWithInfo);
      } catch (error) {
        console.error("Erro ao buscar a lista de reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Carregando reservas...</p>;
  }

  return (
    <div className={`container ${style.container}`}>
      <h1 className={style.h1}>Lista de Reservas</h1>
      <Link href="reserva/add-reserva" passHref>
        <button className={`btn btn-success ${style.link}`}>Cadastrar Reserva</button>
      </Link>
      <div className="table-responsive mt-4">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">ReservaId</th>
              <th scope="col">Cliente</th>
              <th scope="col">Destino</th>
              <th scope="col">ImagemUrl</th>
              <th scope="col">Pacote</th>
              <th scope="col">Total</th>
              <th scope="col">Data</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((element) => (
              <tr key={element.id_reserva}>
                <td>{element.id_reserva}</td>
                <td>{element.clienteNome}</td>
                <td>{element.destinoNome}</td>
                <td>
                  <img src={element.destinoImage} alt="Imagem do URL inserido" className={style.imagemdestino} />
                </td>
                <td>{element.pacoteNome}</td>
                <td>{formatCurrency(element.valorReserva)}</td>
                <td>{formatDate(element.data_reserva)}</td>
                <td>
                  <Link href={`reserva/update-reserva/${element.id_reserva}`} passHref>
                    <button className={`btn btn-warning ${style.acaoBtn}`}>Editar</button>
                  </Link>
                  <Link href={`reserva/delete-reserva/${element.id_reserva}`} passHref>
                    <button className={`btn btn-danger ${style.acaoBtn}`}>Excluir</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;

import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "../../styles/Home.module.css";
import Link from "next/link";

const Home = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7024/api/Clientes")
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar a lista de clientes:", error);
      });
  }, []);

  return (
    <div className={`container ${style.container}`}>
      <h1 className={style.h1}>Lista de Clientes</h1>
      <Link href="cliente/add-cliente" passHref>
        <button className={`btn btn-success ${style.link}`}>Cadastrar Cliente</button>
      </Link>
      <div className="table-responsive mt-4">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">CategoriaId</th>
              <th scope="col">Nome</th>
              <th scope="col">Telefone</th>
              <th scope="col">Email</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((element) => (
              <tr key={element.id_cliente}>
                <td>{element.id_cliente}</td>
                <td>{element.nome}</td>
                <td>{element.telefone}</td>
                <td>{element.email}</td>
                <td>
                  <Link href={`cliente/update-cliente/${element.id_cliente}`} passHref>
                    <button className={`btn btn-warning ${style.acaoBtn}`}>Editar</button>
                  </Link>
                  <Link href={`cliente/delete-cliente/${element.id_cliente}`} passHref>
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

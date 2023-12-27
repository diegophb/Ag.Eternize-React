import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "../../styles/Home.module.css";
import Link from "next/link";

const Home = () => {
  const [pacotes, setPacotes] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7024/api/Pacotes")
      .then((response) => {
        setPacotes(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar a lista de pacotes:", error);
      });
  }, []);

  return (
    <div className={`container ${style.container}`}>
      <h1 className={style.h1}>Lista de Pacotes</h1>
      <Link href="pacote/add-pacote" passHref>
        <button className={`btn btn-success ${style.link}`}>Cadastrar Pacote</button>
      </Link>
      <div className="table-responsive mt-4">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">PacoteId</th>
              <th scope="col">Nome</th>
              <th scope="col">Valor</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {pacotes.map((element) => (
              <tr key={element.id_pacote}>
                <td>{element.id_pacote}</td>
                <td>{element.nome}</td>
                <td>R$ {Number(element.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td>
                  <Link href={`pacote/update-pacote/${element.id_pacote}`} passHref>
                    <button className={`btn btn-warning ${style.acaoBtn}`}>Editar</button>
                  </Link>
                  <Link href={`pacote/delete-pacote/${element.id_pacote}`} passHref>
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

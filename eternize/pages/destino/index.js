import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "../../styles/Home.module.css";
import Link from "next/link";

const Home = () => {
  const [destinos, setDestinos] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7024/api/Destinos")
      .then((response) => {
        setDestinos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar a lista de destinos:", error);
      });
  }, []);

  return (
    <div className={`container ${style.container}`}>
      <h1 className={style.h1}>Lista de Destinos</h1>
      <Link href="destino/add-destino" passHref>
        <button className={`btn btn-success ${style.link}`}>Cadastrar Destino</button>
      </Link>
      <div className="table-responsive mt-4">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">DestinoId</th>
              <th scope="col">Nome</th>
              <th scope="col">ImagemUrl</th>
              <th scope="col">Valor</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {destinos.map((element) => (
              <tr key={element.id_destino}>
                <td>{element.id_destino}</td>
                <td>{element.nome}</td>
                <td>
                  <img src={element.imagemUrl} alt={`Imagem do ${element.nome}`} className={style.imagemdestino} />
                </td>
                <td>R$ {Number(element.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td>
                  <Link href={`destino/update-destino/${element.id_destino}`} passHref>
                    <button className={`btn btn-warning ${style.acaoBtn}`}>Editar</button>
                  </Link>
                  <Link href={`destino/delete-destino/${element.id_destino}`} passHref>
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

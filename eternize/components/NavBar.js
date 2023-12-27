import { useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      require('bootstrap/dist/js/bootstrap.min.js');
    }
  }, []);

  return (
        <>
  <div
    className="container-fluid-sm"   
    style={{
      backgroundImage: "url(/img/cab.jpg)",
      height: 300,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      padding: 40
    }}
  >
    <div className="row">
      <div className="col-md-12">
        {" "}
        <img src="/img/logo01.png" style={{ height: 230 }} />
      </div>
    </div>
  </div>
  <div className="navprincipal">
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: "linear-gradient(28deg, #fdfffe 1%,#5ab795 99%)",
        paddingRight: 40
      }}
    >
      <div className="container">
        <a className="navbar-brand " href="">
          <img src="/img/logo.png" style={{ height: 25 }} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="alterna navegação"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li className="nav-item active ">
              <a className="nav-link " id="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="nav-link" href="/cliente">
                Clientes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="nav-link" href="/destino">
                Destinos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="nav-link" href="/pacote">
                Pacotes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="nav-link" href="/reserva">
                Reserva
              </a>
            </li>
          </ul>
          <table
            className="subcabecalho"
            cellSpacing={0}
            cellPadding={8}
            border-top={0}
          >
            <tbody>
              <tr>
                <td>
                  <img
                    className="subclass"
                    src="/img/twitter.png"
                    alt="logo1"
                  />{" "}
                </td>
                <td>
                  <img
                    className="subclass"
                    src="/img/facebook.png"
                    alt="logo3"
                  />
                </td>
                <td>
                  <img
                    className="subclass"
                    src="/img/instagran.png"
                    alt="logo2"
                  />
                </td>
                <td>
                  <img
                    className="subclass"
                    src="/img/google.png"
                    alt="logo4"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <form className="search-box">
            <input type="text" className="search-txt" placeholder="Pesquisar" />
            <a className="search-btn" href="#">
              <img
                src="/img/lupa.svg"
                alt="lupa"
                height="20px"
                width="20px"
              />
            </a>
          </form>
        </div>
      </div>
    </nav>
  </div>


    </>
  );
};

export default Navbar;
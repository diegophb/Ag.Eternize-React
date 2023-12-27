import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer
      className="text-light"
      style={{ textAlign: "center", backgroundColor: "#a49abb", width: "100%" }}
    >
      <div
        style={{
          background: "linear-gradient(28deg, #99eed2 1%, #e9e4f4 99%)",
          padding: 20,
          color: "black",
          width: "100%"
        }}
      >
        © 2023 Copyright:{" "}
        <a href="#" style={{ textDecoration: "none", color: "black" }}>
          Nossas filiais no Brasil
        </a>
      </div>
    </footer>
  );
};

export default Footer;

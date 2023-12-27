import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "../styles/WelcomeScreen.module.css";
import { Container, Row, Col, Card } from "react-bootstrap";

const placesData = [
  {
    name: "Maldivas",
    image: "/img/01.jpg",
  },
  {
    name: "Curitiba",
    image: "/img/nacional/curitiba.jpg",
  },
  {
    name: "Emirates",
    image: "/img/03.jpg",
  },
  {
    name: "J.Pessoa",
    image: "/img/nacional/joao.jpg",
  },
];

const WelcomeScreen = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={style.container}>
      <Container className={style.titleContainer}>
        <h1 className={style.title}>Bem-vindo à Nossa Agência de Viagens</h1>
      </Container>
      <Container className={style.sliderContainer}>
        <Slider {...sliderSettings}>
          {placesData.map((place, index) => (
            <div key={index} className={style.slideItem}>
              <img src={place.image} alt={place.name} className={style.slideImage} />
              <p className={style.placeName}>{place.name}</p>
            </div>
          ))}
        </Slider>
      </Container>
      <Container className={style.cardContainer}>
        <Row>
          {placesData.map((place, index) => (
            <Col key={index} md={3} sm={6} xs={12} className={style.cardItem}>
              <Card>
                <Card.Img variant="top" src={place.image} alt={place.name} className={style.cardImage} />
                <Card.Body>
                  <Card.Title className={style.placeName}>{place.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default WelcomeScreen;

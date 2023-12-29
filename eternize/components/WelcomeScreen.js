// WelcomeScreen.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import style from "../styles/WelcomeScreen.module.css";

const placesData = [
  {
    name: "Maldivas",
    image: "/img/01.jpg",
    description: "Explore as praias exóticas e as águas cristalinas das Maldivas.",
  },
  {
    name: "Curitiba",
    image: "/img/nacional/curitiba.jpg",
    description: "Descubra a beleza e a cultura de Curitiba, uma cidade encantadora.",
  },
  {
    name: "Emirates",
    image: "/img/03.jpg",
    description: "Viva a experiência luxuosa e vibrante dos Emirados Árabes Unidos.",
  },
  {
    name: "J.Pessoa",
    image: "/img/nacional/joao.jpg",
    description: "Relaxe nas praias paradisíacas de João Pessoa, na Paraíba.",
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
    autoplaySpeed: 5000,
    fade: true,
    cssEase: "linear",
  };

  return (
    <div className={style.container}>
      <Container className={style.titleContainer}>
        <h1 className={style.title}>Bem-vindo à Nossa Agência de Viagens</h1>
      </Container>
      <Container className={style.sliderContainer}>
        <Slider {...sliderSettings} className={style.slider}>
          {placesData.map((place, index) => (
            <div key={index} className={style.slideItem}>
              <img src={place.image} alt={place.name} className={style.slideImage} />
              <div className={style.slideContent}>
                <h3 className={style.placeName}>{place.name}</h3>
                <p className={style.placeDescription}>{place.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </Container>
      <Container className={style.cardContainer}>
        <Row>
          {placesData.map((place, index) => (
            <Col key={index} md={3} sm={6} xs={12} className={style.cardItem}>
              <Card className={style.card}>
                <Card.Img variant="top" src={place.image} alt={place.name} className={style.cardImage} />
                <Card.Body>
                  <Card.Title className={style.placeName}>{place.name}</Card.Title>
                  <Card.Text className={style.placeDescription}>{place.description}</Card.Text>
                  <Button variant="primary" className={style.learnMoreButton}>
                    Saiba Mais
                  </Button>
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

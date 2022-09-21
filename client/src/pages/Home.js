import Carousel from 'react-bootstrap/Carousel'
import React from 'react';

import img1 from "../img1.jpg";
import img2 from "../img2.jpg";
import img3 from "../img3.png";

export const Home = () => (
  <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img1}
          height='870vh'
          style={{objectFit: 'cover'}}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Torne-se nosso aluno hoje mesmo!</h3>
          <p>Questões criadas por professores especializados.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img2}
          height='870vh'
          style={{objectFit: 'cover'}}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Já é nosso aluno?</h3>
          <p>Faça login e aproveite!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img3}
          height='870vh'
          style={{objectFit: 'cover'}}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Quer fazer parte do nosso time?</h3>
          <p>Venha fazer parte do nosso time de experts!</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
)
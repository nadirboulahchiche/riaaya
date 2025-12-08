import React from "react";
import Button from "../Layouts/Button";
import { Carousel, IconButton } from "@material-tailwind/react";

const Home = () => {
  return (
    <Carousel
      className="rounded-xl"
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4 z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 right-4 -translate-y-2/4 z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}
    >
      {/* Slide 1 */}
      <div className="relative h-full w-full">
        <img
          src="./src/assets/img/home-image.jpg"
          alt="Slide 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hoverColor/30 flex flex-col justify-center items-center text-white text-center px-4">
          <h2 className="text-4xl font-bold mb-4">Bienvenue sur Riaaya + – Votre santé en un clic !</h2>
          <p className="text-lg mb-6 mx-5">Riaaya + est une plateforme en ligne moderne et intuitive qui vous permet de réserver facilement un rendez-vous avec un médecin, un pharmacien ou tout autre professionnel de santé. Que vous ayez besoin d'une consultation urgente ou d'un simple suivi, notre système vous connecte rapidement aux praticiens disponibles près de chez vous.</p>
          <Button title={"Resrver maintenant"}></Button>
        </div>
      </div>

      {/* Slide 2 */}
      <div className="relative h-full w-full">
        <img
          src="./src/assets/img/home-image1.jpg"
          alt="Slide 2"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hoverColor/30 flex flex-col justify-center items-center text-white text-center px-4">
          <h2 className="text-4xl font-bold mb-4">dazdazdazdazd</h2>
          <p className="text-lg mb-6">azdddddddddddddddddddddddddddddddddddddddddddd.</p>
          <Button title={"Browse"}></Button>
        </div>
      </div>
    </Carousel>
  );
};

export default Home;

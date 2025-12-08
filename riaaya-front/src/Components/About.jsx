import React from "react";
import img from "../assets/img/about.jpg";

const About = () => {
  return (
    <div className=" min-h-screen flex flex-col lg:flex-row justify-between items-center lg:px-32 px-5 pt-24 lg:pt-16 gap-5">
      <div className=" w-full lg:w-3/4 space-y-4">
        <h1 className=" text-4xl font-semibold text-center lg:text-start">About Us</h1>
        <p className=" text-justify lg:text-start">
Riaaya + est née de l’ambition de simplifier l’accès aux soins de santé. Nous pensons que chacun mérite une prise en charge rapide, efficace et personnalisée, sans complexité.

        </p>
        <p className="text-justify lg:text-start">
Nous voulons rapprocher les patients des professionnels de santé, en digitalisant le processus de réservation et en centralisant les informations médicales essentielles sur une seule et même plateforme.

        </p>
        <p className="text-justify lg:text-start">
Derrière Riaaya + se trouvent des experts en technologie et des professionnels de la santé, unis par une vision commune : rendre la santé plus accessible, transparente et sécurisée pour tous.

        </p>
      </div>
      <div className=" w-full lg:w-3/4">
        <img className=" rounded-lg" src={img} alt="img" />
      </div>
    </div>
  );
};

export default About;
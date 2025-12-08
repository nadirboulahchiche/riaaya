import React, { useState } from "react";

import { RiMicroscopeLine } from "react-icons/ri";

import { MdHealthAndSafety } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";
import Button from "../Layouts/Button";
import ServicesCard from "../Layouts/ServicesCard";

const Services = () => {
    const[textMedcin,setTextMedcin] = useState("Besoin d’un médecin généraliste ou spécialiste ? Avec Riaaya +, trouvez rapidement un professionnel de santé disponible selon vos critères (spécialité, langue, localisation). Réservez votre consultation en ligne en quelques clics, que ce soit pour un rendez-vous en cabinet ou en téléconsultation.")
    const[textpharmacien,settextpharmacien] = useState("Recherchez une pharmacie proche de chez vous et vérifiez sa disponibilité. Certains pharmaciens proposent également des services personnalisés comme la préparation d’ordonnances, le conseil santé, ou même des consultations rapides pour les cas non urgents. Avec Riaaya +, plus besoin de faire le tour des pharmacies : vous avez tout à portée de main.")
    const[textUrgences ,settextUrgences] = useState("En cas de besoin urgent, Riaaya + vous guide vers les établissements de santé les plus proches ou les praticiens disponibles en urgence. Notre plateforme vous aide à gagner du temps en identifiant les solutions les plus rapides selon votre localisation, même en dehors des horaires classiques.")






  const icon1 = (
    <RiMicroscopeLine size={35} className=" text-backgroundColor" />
  );
  const icon2 = (
    <MdHealthAndSafety size={35} className=" text-backgroundColor" />
  );
  const icon3 = <FaHeartbeat size={35} className=" text-backgroundColor" />;

  return (
    <div className=" min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24 lg:pt-16">
      <div className=" flex flex-col items-center justify-between">
        <div>
          <h1 className=" text-4xl font-semibold text-center lg:text-center">
            Nos Services
          </h1>
          <p className=" mt-2 text-center lg:text-center">
      Prise de rendez-vous médicale en ligne ,trouvez un médecin généraliste, spécialiste ou pharmacien selon votre besoin.

          </p>
        </div>
      </div>
      <div className=" flex flex-col lg:flex-row gap-5 pt-14">
        <ServicesCard icon={icon1} title="Medcin" text={textMedcin} />
        <ServicesCard icon={icon2} title="Pharmacien" text={textpharmacien}/>
        <ServicesCard icon={icon3} title="Urgence" text={textUrgences}/>
      </div>
    </div>
  );
};

export default Services;
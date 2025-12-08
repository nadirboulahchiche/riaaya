import React from "react";
import { Link } from "react-scroll";
import logo from "../assets/img/Riaya.png";

const Footer = () => {
  return (
    <div className="bg-backgroundColor text-white rounded-t-3xl mt-8 md:mt-0">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
        <div className="w-full md:w-1/4">
          <img
            src={logo}
            className="w-20 h-20 object-cover rounded-full mb-5"
          />
          <p className="text-sm">
            Riaaya + est une plateforme moderne permettant de réserver facilement des rendez-vous médicaux avec des médecins,
            pharmaciens ou spécialistes de santé, y compris en cas d’urgence.
          </p>
        </div>

        <div>
          <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">À propos</h1>
          <nav className="flex flex-col gap-2">
            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              Notre mission
            </Link>
            <Link
              to="services"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              Nos services
            </Link>
            <Link
              to="doctors"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              Nos professionnels
            </Link>
          </nav>
        </div>

        <div>
          <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Services</h1>
          <nav className="flex flex-col gap-2">
            <Link
              to="services"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              Consultations médicales
            </Link>
            <Link
              to="services"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              Services de pharmacie
            </Link>
            <Link
              to="services"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              Urgences et soins rapides
            </Link>
          </nav>
        </div>

        <div className="w-full md:w-1/4">
          <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Contact</h1>
          <nav className="flex flex-col gap-2">
            <span>Alger, Algérie</span>
            <span>contact@Riaaya +.dz</span>
            <span>+213 123 456 789</span>
          </nav>
        </div>
      </div>

      <div>
        <p className="text-center py-4">
          © 2025 Riaaya +. Tous droits réservés.
        </p>
      </div>
    </div>
  );
};

export default Footer;
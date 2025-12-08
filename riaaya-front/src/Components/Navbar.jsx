import { Link } from "react-scroll";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import Contact from "../models/Contact";
import logo from "../assets/img/Riaya.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenu(!menu);

  return (
    <header className="fixed top-0 left-0 w-full z-20 bg-backgroundColor shadow-md">
      <div className="flex justify-between items-center px-6 md:px-32 py-4 text-white">
        <img
          src={logo}
          className="w-20 h-20 object-cover rounded-full"
        />
        {/* Desktop Menu */}
        <nav className="hidden lg:flex space-x-8 text-lg font-medium">
          <Link to="home" spy smooth duration={500} className="hover: cursor-pointer">Accueil</Link>
          <Link to="about" spy smooth duration={500} className="hover:text-hoverColor cursor-pointer">À propos</Link>
          <Link to="services" spy smooth duration={500} className="hover:text-hoverColor cursor-pointer">Services</Link>
          <Link to="doctors" spy smooth duration={500} className="hover:text-hoverColor cursor-pointer">Médecins</Link>
          <Link to="blogs" spy smooth duration={500} className="hover:text-hoverColor cursor-pointer">Articles</Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-backgroundColor px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition"
          >
            Se connecter
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          {menu ? (
            <AiOutlineClose size={28} onClick={toggleMenu} className="cursor-pointer" />
          ) : (
            <AiOutlineMenu size={28} onClick={toggleMenu} className="cursor-pointer" />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden flex flex-col items-center bg-backgroundColor text-white absolute w-full top-16 transition-transform duration-300 ${menu ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <Link to="home" spy smooth duration={500} className="py-3 w-full text-center border-b" onClick={toggleMenu}>Accueil</Link>
        <Link to="about" spy smooth duration={500} className="py-3 w-full text-center border-b" onClick={toggleMenu}>À propos</Link>
        <Link to="services" spy smooth duration={500} className="py-3 w-full text-center border-b" onClick={toggleMenu}>Services</Link>
        <Link to="doctors" spy smooth duration={500} className="py-3 w-full text-center border-b" onClick={toggleMenu}>Médecins</Link>
        <Link to="blogs" spy smooth duration={500} className="py-3 w-full text-center border-b" onClick={toggleMenu}>Articles</Link>
        <button
          className="w-11/12 mb-4 py-2 rounded-md bg-brightColor text-white font-medium hover:bg-hoverColor transition"
        >
          Se connecter
        </button>
      </div>
    </header>
  );
};

export default Navbar;

import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from './Modal';
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const doc1 = "/img/garde malade.jpg";
const doc2 = "/img/doc2.jpg";
const doc3 = "/img/doc3.jpg";
const doc4 = "/img/doc4.jpg";
const doc5 = "/img/doc5.jpg";
const doc6 = "/img/doc6.jpg";
import { getDoctors } from "../Api/apiRequest";

const Doctors = () => {
  const data = [
    { img: doc1, name: "Dr. Samia Allali", specialties: "Garde Malade" },
    { img: doc2, name: "Dr. Youssef Benkhaled", specialties: "Infirmier" },
    { img: doc3, name: "Dr. Fatima Zahra", specialties: "Pharmacienne" },
    { img: doc4, name: "Dr. Ali Kadem", specialties: "Neurologue" },
    { img: doc5, name: "Dr. Salim El Hassani", specialties: "Dermatologue" },
    { img: doc6, name: "Dr. Leïla Mansouri", specialties: "Ophtalmologue" },
  ];

  const [doctorData, setdoctorData] = useState([])
  const [img,selectedimg] = useState(null)
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const slider = useRef(null);



    useEffect(() => {
      getDoctors()
        .then((data) => {
          setdoctorData(data);
        })
        .catch((err) => {
          console.error("Error fetching doctor data", err);
        });
    }, []);

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      arrows: false,
      slidesToShow: showMore ? 5 : 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1023,
          settings: { slidesToShow: showMore ? 4 : 3 },
        },
        {
          breakpoint: 768,
          settings: { slidesToShow: showMore ? 3 : 2 },
        },
        {
          breakpoint: 480,
          settings: { slidesToShow: 1 },
        },
      ],
    };

    return (
      <div className="min-h-screen flex flex-col justify-center px-5 lg:px-32 pt-16 bg-gray-50 dark:bg-gray-900">
        <header className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white">
            Nos collaborateurs
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
            Nous sommes fiers de collaborer avec différents acteurs du secteur de la santé.
          </p>
        </header>

        <section>
          <Slider ref={slider} {...settings}>
            {doctorData.map((e, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="w-72 mx-auto cursor-pointer"
                onClick={() => {setSelectedDoctor(e);selectedimg(e.imagePath)}}
              >
                <Card className="rounded-xl shadow-md hover:shadow-xl bg-white dark:bg-gray-800 transition-shadow duration-300 my-3">
                  <CardHeader className="rounded-xl overflow-hidden aspect-square relative mt-5">
                    
                      <img
                        src={e.imagePath}
                        alt={`Portrait de ${e.name}`}
                        className="w-full h-full object-cover object-center rounded-xl transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    
                  </CardHeader>
                  <CardBody className="text-center py-4">
                    <Typography variant="h5" className="mb-1 font-bold text-gray-800 dark:text-white">
                      {e.name}
                    </Typography>
                    <Typography className="text-md text-gray-500 dark:text-gray-300">
                      {e.specialty}
                    </Typography>
                  </CardBody>
                </Card>
              </motion.article>
            ))}
          </Slider>
        </section>

        {/* Bouton Afficher plus */}
        <div className="text-center mt-8">
          <button
            onClick={() => setShowMore(!showMore)}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {showMore ? 'Afficher moins' : 'Afficher plus'}
          </button>
        </div>

        {/* Modal */}
        <Modal doctorimg={img} doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
      </div>
    );
  };

  export default Doctors;

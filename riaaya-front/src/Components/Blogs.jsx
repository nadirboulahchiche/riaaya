import React from "react";

import img1 from "../assets/img/blog1.jpg";
import img2 from "../assets/img/blog2.jpg";
import img3 from "../assets/img/blog3.jpg";
import img4 from "../assets/img/blog4.jpg";

const posts = [
  {
    title: "Optimisez vos consultations en ligne",
    desc: "Découvrez comment la téléconsultation via Riaaya + facilite les soins pour les patients comme pour les médecins.",
    image: img1,
  },
  {
    title: "Gérez votre cabinet efficacement",
    desc: "Apprenez à utiliser les outils Riaaya + pour gérer les rendez-vous et améliorer l'organisation de votre pratique.",
    image: img2,
  },
  {
    title: "Renforcez la relation patient-médecin",
    desc: "Des conseils pour instaurer une meilleure communication et créer un lien de confiance durable.",
    image: img3,
  },
  {
    title: "Améliorez l'accès aux soins",
    desc: "Comment Riaaya + permet aux patients de trouver facilement des professionnels de santé à proximité.",
    image: img4,
  },
];

const Blogs = () => {
  return (
    <section className="py-20 px-6 md:px-20 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Conseils & Actualités Santé
        </h2>
        <p className="text-gray-500">
          Retrouvez nos dernières publications autour de la santé, la médecine connectée et la plateforme Riaaya +.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {posts.map((post, index) => (
          <div
            key={index}
            className="relative min-h-[400px] bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 pb-20 flex-1">
              <h3 className="font-semibold text-xl mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm">{post.desc}</p>
            </div>
            <div className="absolute bottom-5 right-5">
              <button className="bg-backgroundColor text-white px-4 py-2 text-sm rounded hover:bg-hoverColor transition">
                Lire l’article
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;

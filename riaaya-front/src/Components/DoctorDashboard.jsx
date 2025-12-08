import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { AuthContext } from '../Context/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import { getStatDoctors } from '../Api/apiRequest';

// Données pour le graphique des rendez-vous
const data = [
  { name: 'juin', appointments: 1 },
];

export default function DoctorDashboard() {
  const { user } = useContext(AuthContext);
  const [stat,setStat] = useState({})


    useEffect(() => {
      getStatDoctors(user.email,user.authToken)
        .then((data) => {
          setStat(data);
        })
        .catch((err) => {
          console.error("Error fetching doctor data", err);
        });
    }, []);






  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bienvenue Dr. {user?.name}</h1>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="p-4 bg-white rounded-2xl shadow-md">
          <h2 className="text-gray-500 text-sm">Rendez-vous</h2>
          <p className="text-2xl font-bold">{stat.total}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow-md">
          <h2 className="text-gray-500 text-sm">Patients Suivis</h2>
          <p className="text-2xl font-bold">{stat.accepted}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow-md">
          <h2 className="text-gray-500 text-sm">Disponibilité Aujourd'hui</h2>
          <p className="text-2xl font-bold text-green-600">Disponible</p>
        </div>
      </div>

      {/* Graphique en barres */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Rendez-vous par mois</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="appointments" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

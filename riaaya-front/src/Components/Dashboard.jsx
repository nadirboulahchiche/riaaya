import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { AuthContext } from '../Context/AuthContext';
import React, { useState,useContext } from 'react';

// Données pour le graphique
const data = [
  { name: 'juin', users: 1 }
  /*,
  { name: 'Fév', users: 300 },
  { name: 'Mars', users: 500 },
  { name: 'Avr', users: 700 },
  { name: 'Mai', users: 600 },*/
];

export default function Dashboard() {


  const { user } = useContext(AuthContext);



  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-4 bg-white rounded-2xl shadow-md">
          <h2 className="text-gray-500 text-sm">Utilisateurs</h2>
          <p className="text-2xl font-bold">6</p>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow-md">
          <h2 className="text-gray-500 text-sm">Reservation</h2>
          <p className="text-2xl font-bold">1</p>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow-md">
          <h2 className="text-gray-500 text-sm">Revenus</h2>
          <p className="text-2xl font-bold">2500DZD </p>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow-md">
          <h2 className="text-gray-500 text-sm">Reservation Aujourd'hui</h2>
          <p className="text-2xl font-bold">1</p>
        </div>
      </div>

      {/* Graphique en barres */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Demande Riaaya par mois</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="users" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

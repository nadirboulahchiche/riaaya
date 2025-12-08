import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { getAppointemenets } from "../Api/apiRequest";

const AcceptedAppointments = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAcceptedAppointments = async () => {
      try {
        const data = await getAppointemenets(user.email, user.authToken);
        setAppointments(data.Accepted || []);
      } catch (error) {
        console.error("Erreur lors du chargement des rendez-vous acceptés", error);
      }
    };

    fetchAcceptedAppointments();
  }, [user.email, user.authToken]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-5 lg:px-32 pt-16 pb-10">
      <header className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white">
          Rendez-vous acceptés
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Voici la liste des rendez-vous validés par vous.
        </p>
      </header>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          Aucun rendez-vous accepté pour le moment.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-300">
            <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">Nom du patient</th>
                <th scope="col" className="px-6 py-3">Téléphone</th>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Heure</th>
                <th scope="col" className="px-6 py-3 text-center">Statut</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{appt.clientName}</td>
                  <td className="px-6 py-4">{appt.phoneNumber}</td>
                  <td className="px-6 py-4">{appt.date}</td>
                  <td className="px-6 py-4">{appt.time}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-green-600 font-semibold">Accepté</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AcceptedAppointments;

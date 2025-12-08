import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { getAppointemenets, UpdateAppointmenets } from "../Api/apiRequest";
import { Button } from "@material-tailwind/react";

const PatientAppointments = () => {
  const { user } = useContext(AuthContext);
  const [pendingAppointments, setPendingAppointments] = useState([]);

  useEffect(() => {
    getAppointemenets(user.email, user.authToken)
      .then((data) => {
        setPendingAppointments(data.Pending || []);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des rendez-vous", err);
      });
  }, [user.email, user.authToken]);

  const handleResponse = async (id, newStatus) => {
    try {
      await UpdateAppointmenets(id, newStatus, user.authToken); // Send PATCH
      setPendingAppointments((prev) =>
        prev.filter((appt) => appt.id !== id)
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-5 lg:px-32 pt-16 pb-10">
      <header className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white">
          Demandes en attente
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Voici les rendez-vous en attente de confirmation.
        </p>
      </header>

      {pendingAppointments.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Aucun rendez-vous en attente.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Nom du client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Téléphone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Heure
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {pendingAppointments.map((appt) => (
                <tr key={appt.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {appt.clientName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {appt.phoneNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {appt.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {appt.time}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <Button
                      size="sm"
                      color="green"
                      onClick={() => handleResponse(appt.id, "ACCEPTED")}
                    >
                      Accepter
                    </Button>
                    <Button
                      size="sm"
                      color="red"
                      onClick={() => handleResponse(appt.id, "REFUSED")}
                    >
                      Refuser
                    </Button>
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

export default PatientAppointments;

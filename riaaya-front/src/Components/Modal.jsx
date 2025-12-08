import { useState } from "react";
import { createAppointment } from "../Api/apiRequest";

export default function Modal({ doctorimg, doctor, onClose }) {
  const [form, setForm] = useState({
    clientName: "",
    phoneNumber: "",
    date: "",
    time: "",
    doctorId: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment request:", {
      doctor: doctor.name,
      ...form,
    });
    const appointmentData = {
      ...form,
      doctorId: doctor.id, 
    };

    createAppointment(appointmentData)
    alert(`Votre demande de rendez-vous a été envoyée à ${doctor.name}`);
    onClose();
  };

  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={doctorimg}
            alt={doctor.name}
            className="w-20 h-20 object-cover rounded-full border-2 border-blue-500"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              {doctor.name}
            </h2>
            <p className="text-gray-500 dark:text-gray-300">{doctor.specialty}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-700 dark:text-gray-200 block mb-1">Nom complet</label>
            <input
              type="text"
              name="clientName"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-200 block mb-1">Numéro de téléphone</label>
            <input
              type="tel"
              name="phoneNumber"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-200 block mb-1">Date</label>
            <input
              type="date"
              name="date"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-200 block mb-1">Heure</label>
            <input
              type="time"
              name="time"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-white"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Réserver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

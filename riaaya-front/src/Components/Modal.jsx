import { useState } from "react";
import { createAppointment } from "../Api/apiRequest";
import { API_URL } from "../apiConfig";

export default function Modal({ doctorimg, doctor, onClose }) {
  const [form, setForm] = useState({
    clientName: "",
    phoneNumber: "",
    date: "",
    time: "",
    doctorId: "",
    amount: 2000 // Default amount in DZD
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Create appointment
      const appointmentData = {
        clientName: form.clientName,
        phoneNumber: form.phoneNumber,
        date: form.date,
        time: form.time,
        doctorId: doctor.id,
      };

    const appointmentResponse = await createAppointment(appointmentData);
    console.log('Appointment created:', appointmentResponse);
    
    // Step 2: Register payment with SATIM
    const paymentData = {
      amount: parseFloat(form.amount),
      appointmentId: appointmentResponse.id, // ✅ CORRECT - response is direct object
      language: 'fr'
    };

      const paymentResponse = await fetch(`${API_URL}/payment/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      const paymentResult = await paymentResponse.json();

      if (paymentResult.success && paymentResult.formUrl) {
        // Redirect to SATIM payment page
        window.location.href = paymentResult.formUrl;
      } else {
        throw new Error('Échec de l\'initialisation du paiement');
      }

    } catch (error) {
      console.error('Error:', error);
      alert('Erreur lors de la réservation. Veuillez réessayer.');
      setLoading(false);
    }
  };

  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 hover:text-red-500 text-xl font-bold"
          disabled={loading}
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
            <label className="text-gray-700 dark:text-gray-200 block mb-1">
              Nom complet *
            </label>
            <input
              type="text"
              name="clientName"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:text-white"
              placeholder="Votre nom complet"
            />
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-200 block mb-1">
              Numéro de téléphone *
            </label>
            <input
              type="tel"
              name="phoneNumber"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:text-white"
              placeholder="0555 XX XX XX"
            />
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-200 block mb-1">
              Date *
            </label>
            <input
              type="date"
              name="date"
              required
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-200 block mb-1">
              Heure *
            </label>
            <input
              type="time"
              name="time"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-200 block mb-1">
              Montant de consultation (DZD) *
            </label>
            <select
              name="amount"
              required
              value={form.amount}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:text-white"
            >
              <option value="1000">1 000 DZD - Consultation simple</option>
              <option value="2000">2 000 DZD - Consultation standard</option>
              <option value="3000">3 000 DZD - Consultation spécialisée</option>
              <option value="4000">4 000 DZD - Consultation complète</option>
              <option value="5000">5 000 DZD - Consultation premium</option>
            </select>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              💳 Vous serez redirigé vers la page de paiement sécurisée SATIM
              pour finaliser votre réservation.
            </p>
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-white disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Chargement...
                </>
              ) : (
                <>Procéder au paiement</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


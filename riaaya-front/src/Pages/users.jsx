import { useEffect, useState } from "react";
import { getDoctors } from "../Api/apiRequest";


export default function users() {
  const [doctorData, setdoctorData] = useState([])

  const medecins = [
    {
      nom: 'Dr. Amina Benyamina',
      specialite: 'Cardiologie',
      wilaya: 'Alger',
      sexe: 'Femme',
    },
    {
      nom: 'Dr. Yacine Bouzid',
      specialite: 'Dermatologie',
      wilaya: 'Oran',
      sexe: 'Homme',
    },
    {
      nom: 'Dr. Lynda Meziani',
      specialite: 'Pédiatrie',
      wilaya: 'Constantine',
      sexe: 'Femme',
    },
    {
      nom: 'Dr. Nassim Merabet',
      specialite: 'Neurologie',
      wilaya: 'Sétif',
      sexe: 'Homme',
    },
    {
      nom: 'Dr. Farida Amrani',
      specialite: 'Gynécologie',
      wilaya: 'Blida',
      sexe: 'Femme',
    },
  ];

  useEffect(() => {
    getDoctors()
      .then((data) => {
        setdoctorData(data);
      })
      .catch((err) => {
        console.error("Error fetching doctor data", err);
      });
  }, []);


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Nom</th>
            <th scope="col" className="px-6 py-3">Specialités</th>
            <th scope="col" className="px-6 py-3">Wilaya</th>
            <th scope="col" className="px-6 py-3">phone</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {doctorData.map((p, index) => (
            <tr
              key={index}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {p.name}
              </th>
              <td className="px-6 py-4">{p.specialty}</td>
              <td className="px-6 py-4">{p.address}</td>
              <td className="px-6 py-4">{p.phone}</td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

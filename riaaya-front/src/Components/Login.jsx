import React, { useState, useContext } from 'react';
import axios from 'axios';
import logo from "../assets/img/Riaya.png";
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../apiConfig";

const Login = () => {

  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const authetication = () => {
    console.log("start authentification")
    if (email && password) {
      axios.post(`${API_URL}/auth/login`, { email, password })
        .then(({ data }) => {
          console.log('dataa=>',data)
          login(data);
          navigate('/dashboard');
          window.location.reload()

        }).catch((e) => {
          alert('veuillez vérifier vos données !!');
        })
    } else {
      alert("Veuillez remplir tous les champs !!");
    }
  }


  const handelSubmit = (event) => {
    event.preventDefault();
    authetication();
  };

  return (

    <div className="flex min-h-screen bg-gray-100">
      {/* Left - Logo */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <img src={logo} alt="Logo" className="w-2/3 max-w-xs" />
      </div>
      {/* Right - Login Form */}
      <div className="w-1/2 flex items-center justify-center p-10 bg-blue-50">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Connexion à Riaaya+</h2>

          <form className="space-y-4" onSubmit={handelSubmit} >
            <div>
              <label className="block text-gray-700">Adresse Email</label>
              <input
                type="email"
                value={email}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Mot de passe</label>
              <input
                type="password"
                value={password}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

// src/api/userApi.js
import axios from 'axios';
import { API_URL } from '../apiConfig';

const BASE_URL = API_URL; // Use the API_URL from apiConfig

//Insert Appointment 
export const createAppointment = async (AnswerData) => {
    return axios.post(`${BASE_URL}/appointment`, AnswerData);
};

//Get List of Doctors
export const getDoctors = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/doctors`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

//Get List of Doctors
export const getStatDoctors = async (idDoctor,token) => {
    try {
        const response = await axios.get(`${BASE_URL}/appointment/${idDoctor}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

//Get List of Doctors by status
export const getAppointemenets = async (idDoctor,token) => {
    try {
        const response = await axios.get(`${BASE_URL}/appointment/status/${idDoctor}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

//Update Appointments
export const UpdateAppointmenets = async (idDoctor,status,token) => {
    try {
        const response = await axios.patch(`${BASE_URL}/appointment/${idDoctor}`, 
            {status},
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

//Get link verification if existe 
export const Verifaication = async (Link) => {
    try {
        const response = await axios.get(`${BASE_URL}/staff/${Link}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

//Update Status from True to False
export const UpdateStatus = async (Link) => {
    try {
        const response = await axios.patch(`${BASE_URL}/staff/${Link}`);
        return response
    } catch (error) {
        console.error('Error updating staff status:', error.response?.data || error.message);
    }
};

//get all staff Member
export const getAllStaff = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/staff`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error('Error Getting staff', error.response?.data || error.message);
    }
};

//Get Response of an emplyé
export const getAllAnswers = async (Link) => {
    try {
        const response = await axios.get(`${BASE_URL}/answers/${Link}`);
        return response
    } catch (error) {
        console.error('Error Getting staff', error.response?.data || error.message);
    }
};

//Post send email to eachmemeber staff
export const sendEmailMember = async (Link, token) => {
    try {
        const response = await axios.post(`${BASE_URL}/notify/${Link}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response
    } catch (error) {
        console.error('Error Getting staff', error.response?.data || error.message);
    }
};

//Post send email to eachmemeber staff
export const createSmtp = async (token) => {
    try {
        const response = await axios.post(`${BASE_URL}/notify`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error('Error sending message to all staff', error.response?.data || error.message);
    }
};

//Get status for email sending 
export const getStatusSmtp = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/notify`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error('Error sending message to all staff', error.response?.data || error.message);
    }
};

//Get status for email sending 
export const getStatsitcs = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/answers/statistiques`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error('Error getting all statstics', error.response?.data || error.message);
    }
}

//Get status for email sending 
export const getStatsitcsdeux = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/staff/stat`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error('Error getting all statstics', error.response?.data || error.message);
    }
};

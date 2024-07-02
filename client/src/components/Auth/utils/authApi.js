import axios from "axios";


export const registerUser = async (userData) => {
    try {
        const response = await axios.post('/users/register', userData);
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Error registering user';
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post('/users/login', userData);
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Error logging in user';
    }
};

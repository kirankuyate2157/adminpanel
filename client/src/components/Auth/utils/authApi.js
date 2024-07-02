import axios from "axios";


export const registerUser = async (userData) => {
    try {
        const response = await axios.post('use_register_endpoint', userData);
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Error registering user';
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post('use_login_endpoint', userData);
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Error logging in user';
    }
};

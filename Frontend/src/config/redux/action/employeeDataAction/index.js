import axios from 'axios';
import {
    GET_employee_data_SUCCESS,
    GET_employee_data_FAILURE,
    employee_IMAGE_SUCCESS,
    employee_IMAGE_FAILURE,
    GET_employee_data_BY_ID_SUCCESS,
    GET_employee_data_BY_ID_FAILURE,
    GET_employee_data_BY_NIK_SUCCESS,
    GET_employee_data_BY_NIK_FAILURE,
    GET_employee_data_BY_NAME_SUCCESS,
    GET_employee_data_BY_NAME_FAILURE,
    CREATE_employee_data_REQUEST,
    CREATE_employee_data_SUCCESS,
    CREATE_employee_data_FAILURE,
    UPDATE_employee_data_SUCCESS,
    UPDATE_employee_data_FAILURE,
    DELETE_employee_data_SUCCESS,
    DELETE_employee_data_FAILURE
} from './employeeDataActionTypes';

const API_URL = 'http://localhost:5000';

export const getEmployeeData = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/employee_data`);
            dispatch({
                type: GET_employee_data_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_employee_data_FAILURE,
                payload: error.message
            });
        }
    };
};

export const employeeImage = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/images`);
            dispatch({
                type: employee_IMAGE_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: employee_IMAGE_FAILURE,
                payload: error.message
            });
        }
    };
};

export const getEmployeeDataById = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/employee_data/id/${id}`);
            dispatch({
                type: GET_employee_data_BY_ID_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_employee_data_BY_ID_FAILURE,
                payload: error.message
            });
        }
    };
};

export const getEmployeeDataByNik = (nik) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/employee_data/nik/${nik}`);
            dispatch({
                type: GET_employee_data_BY_NIK_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_employee_data_BY_NIK_FAILURE,
                payload: error.message
            });
        }
    };
};

export const getEmployeeDataByName = (emp_name) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/employee_data/name/${emp_name}`);
            dispatch({
                type: GET_employee_data_BY_NAME_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_employee_data_BY_NAME_FAILURE,
                payload: error.message
            });
        }
    };
};

export const createEmployeeData = (formData, navigate) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_employee_data_REQUEST });

        try {
            const response = await axios.post(`${API_URL}/employee_data`, formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            });
            dispatch({
                type: CREATE_employee_data_SUCCESS,
                payload: response.data
            });
            navigate("/employee-data");
            return response.data;
        } catch (error) {
            dispatch({
                type: CREATE_employee_data_FAILURE,
                payload: error.message
            });
            throw error;
        }
    };
};

export const updateEmployeeData = (id, data) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${API_URL}/employee_data/${id}`, data);
            dispatch({
                type: UPDATE_employee_data_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: UPDATE_employee_data_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deleteEmployeeData = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${API_URL}/employee_data/${id}`);
            dispatch({
                type: DELETE_employee_data_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: DELETE_employee_data_FAILURE,
                payload: error.message
            });
        }
    };
};

import axios from 'axios';
import {
    GET_deduction_data_SUCCESS,
    GET_deduction_data_FAILURE,
    CREATE_deduction_data_SUCCESS,
    CREATE_deduction_data_FAILURE,
    UPDATE_deduction_data_SUCCESS,
    UPDATE_deduction_data_FAILURE,
    DELETE_deduction_data_SUCCESS,
    DELETE_deduction_data_FAILURE
} from './deductionDataActionTypes';

const API_URL = 'http://localhost:5000';

export const getDeductionData = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/deduction_data`);
            dispatch({
                type: GET_deduction_data_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_deduction_data_FAILURE,
                payload: error.message
            });
        }
    };
};

export const createDeductionData = (formData, navigate) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}/deduction_data`, formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            });
            dispatch({
                type: CREATE_deduction_data_SUCCESS,
                payload: response.data
            });
            navigate("/deduction-data");
            return response.data;
        } catch (error) {
            dispatch({
                type: CREATE_deduction_data_FAILURE,
                payload: error.message
            });
            throw error;
        }
    };
};

export const updateDeductionData = (id, data) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${API_URL}/deduction_data/${id}`, data);
            dispatch({
                type: UPDATE_deduction_data_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: UPDATE_deduction_data_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deleteDeductionData = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${API_URL}/deduction_data/${id}`);
            dispatch({
                type: DELETE_deduction_data_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: DELETE_deduction_data_FAILURE,
                payload: error.message
            });
        }
    };
};

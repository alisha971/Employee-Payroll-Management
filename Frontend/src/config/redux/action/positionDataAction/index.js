import axios from 'axios';
import {
    GET_position_data_SUCCESS,
    GET_position_data_FAILURE,
    CREATE_position_data_SUCCESS,
    CREATE_position_data_FAILURE,
    UPDATE_position_data_SUCCESS,
    UPDATE_position_data_FAILURE,
    DELETE_position_data_SUCCESS,
    DELETE_position_data_FAILURE
} from './positionDataActionTypes';

const API_URL = 'http://localhost:5000';

export const getPositionData = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/position_data`);
            dispatch({
                type: GET_position_data_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_position_data_FAILURE,
                payload: error.message
            });
        }
    };
};

export const createPositionData = (formData, navigate) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}/position_data`, formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            });
            dispatch({
                type: CREATE_position_data_SUCCESS,
                payload: response.data
            });
            navigate("/position-data");
            return response.data;
        } catch (error) {
            dispatch({
                type: CREATE_position_data_FAILURE,
                payload: error.message
            });
            throw error;
        }
    };
};

export const updatePositionData = (id, data) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${API_URL}/position_data/${id}`, data);
            dispatch({
                type: UPDATE_position_data_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: UPDATE_position_data_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deletePositionData = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${API_URL}/position_data/${id}`);
            dispatch({
                type: DELETE_position_data_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: DELETE_position_data_FAILURE,
                payload: error.message
            });
        }
    };
};

import axios from 'axios';
import {
    GET_salary_data_SUCCESS,
    GET_salary_data_FAILURE,
    DELETE_salary_data_SUCCESS,
    DELETE_salary_data_FAILURE
} from './salaryDataActionTypes';

const API_URL = 'http://localhost:5000';

export const getsalaryData = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/employee_salary_data`);
            dispatch({
                type: GET_salary_data_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_salary_data_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deletesalaryData = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${API_URL}/employee_salary_data/id/${id}`);
            dispatch({
                type: DELETE_salary_data_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: DELETE_salary_data_FAILURE,
                payload: error.message
            });
        }
    };
};

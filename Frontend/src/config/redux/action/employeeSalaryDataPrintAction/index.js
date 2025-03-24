import axios from "axios";
import {
    GET_salary_data_SINGLE_employee_SUCCESS,
    GET_salary_data_SINGLE_employee_FAILURE,
} from "./employeeSalaryDataPrintActionTypes";

export const viewSingleEmployeeSalaryDataSuccess = (data) => ({
    type: GET_salary_data_SINGLE_employee_SUCCESS,
    payload: data,
});

export const viewSingleEmployeeSalaryDataFailure = (error) => ({
    type: GET_salary_data_SINGLE_employee_FAILURE,
    payload: error,
});

export const viewSingleEmployeeSalaryByYear = (dataYear) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/salary_data/month/${dataYear}`
        );
        const data = response.data;
        dispatch(viewSingleEmployeeSalaryDataSuccess(data));
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(viewSingleEmployeeSalaryDataFailure("An error occurred while loading data."));
        }
    }
};

export const viewSingleEmployeeSalaryByMonth = (dataMonth) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/salary_data/month/${dataMonth}`
        );
        const data = response.data;
        dispatch(viewSingleEmployeeSalaryDataSuccess(data));
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(viewSingleEmployeeSalaryDataFailure("An error occurred while loading data."));
        }
    }
};

export const viewSingleEmployeeSalaryByName = (emp_name) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/salary_data/name/${emp_name}`
        );
        const data = response.data;
        dispatch(viewSingleEmployeeSalaryDataSuccess(data));
    } catch (error) {
        console.log(error);
        if (emp_name) {
            dispatch(viewSingleEmployeeSalaryDataFailure("An error occurred while loading data."));
        }
    }
};

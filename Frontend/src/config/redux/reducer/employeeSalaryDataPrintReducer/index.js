import {
    GET_salary_data_SINGLE_employee_SUCCESS,
    GET_salary_data_SINGLE_employee_FAILURE,
} from "../../action/employeeSalaryDataPrintAction/employeeSalaryDataPrintActionTypes";

const initialState = {
    employeeSalaryDataPrint: [], 
    error: null,
  };
  

const employeeSalaryDataPrintReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_salary_data_SINGLE_employee_SUCCESS:
            return {
                ...state,
                employeeSalaryDataPrint: action.payload,
                error: null,
            };
        case GET_salary_data_SINGLE_employee_FAILURE:
            return {
                ...state,
                employeeSalaryDataPrint: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default employeeSalaryDataPrintReducer;

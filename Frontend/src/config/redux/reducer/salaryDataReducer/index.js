import {
    GET_salary_data_SUCCESS,
    GET_salary_data_FAILURE,
    DELETE_salary_data_SUCCESS,
    DELETE_salary_data_FAILURE
} from '../../action/salaryDataAction/salaryDataActionTypes';

const initialState = {
    salaryData: [],
    message: null,
    error: null
};

const salaryDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_salary_data_SUCCESS:
            return {
                ...state,
                salaryData: action.payload,
                message: null,
                error: null,
            };
        case GET_salary_data_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: '',
            };
        case DELETE_salary_data_SUCCESS:
            return {
                ...state,
                message: action.payload,
                error: null,
            };
        case DELETE_salary_data_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        default:
            return state;
    }
};

export default salaryDataReducer;

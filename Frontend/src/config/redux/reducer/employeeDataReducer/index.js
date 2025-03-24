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
} from '../../action/employeeDataAction/employeeDataActionTypes';

const initialState = {
    EmployeeData: [],
    employeeImage: [],
    message: null,
    error: null
};

const EmployeeDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_employee_data_SUCCESS:
            return {
                ...state,
                EmployeeData: action.payload,
                message: null,
                error: null,
            };
        case GET_employee_data_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: '',
            };
        case employee_IMAGE_SUCCESS:
            return {
                ...state,
                employeeImage: action.payload,
                message: null,
                error: null,
            };
        case employee_IMAGE_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: '',
            };
        case GET_employee_data_BY_ID_SUCCESS:
            return {
                ...state,
                EmployeeData: action.payload,
                message: null,
                error: null,
            };
        case GET_employee_data_BY_ID_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        case GET_employee_data_BY_NIK_SUCCESS:
            return {
                ...state,
                EmployeeData: action.payload,
                message: null,
                error: null,
            };
        case GET_employee_data_BY_NIK_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        case GET_employee_data_BY_NAME_SUCCESS:
            return {
                ...state,
                EmployeeData: action.payload,
                message: null,
                error: null,
            };
        case GET_employee_data_BY_NAME_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        case CREATE_employee_data_REQUEST:
            return {
                ...state,
                error: null,
                message: null,
            };
        case CREATE_employee_data_SUCCESS:
            return {
                ...state,
                error: null,
                message: null,
            };
        case CREATE_employee_data_FAILURE:
            return {
                ...state,
                error: action.payload.message,
                message: null,
            };
        case UPDATE_employee_data_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
                error: null,
            };
        case UPDATE_employee_data_FAILURE:
            return {
                ...state,
                error: action.payload.message,
                message: null,
            };
        case DELETE_employee_data_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
                error: null,
            };
        case DELETE_employee_data_FAILURE:
            return {
                ...state,
                error: action.payload.message,
                message: null,
            };
        default:
            return state;
    }
};

export default EmployeeDataReducer;

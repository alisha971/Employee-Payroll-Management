import {
    GET_deduction_data_SUCCESS,
    GET_deduction_data_FAILURE,
    CREATE_deduction_data_SUCCESS,
    CREATE_deduction_data_FAILURE,
    UPDATE_deduction_data_SUCCESS,
    UPDATE_deduction_data_FAILURE,
    DELETE_deduction_data_SUCCESS,
    DELETE_deduction_data_FAILURE
} from '../../action/deductionDataAction/deductionDataActionTypes';

const initialState = {
    deductionData: [],
    message: null,
    error: null
};

const DeductionDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_deduction_data_SUCCESS:
            return {
                ...state,
                DeductionData: action.payload,
                message: null,
                error: null,
            };
        case GET_deduction_data_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: '',
            };
        case CREATE_deduction_data_SUCCESS:
            return {
                ...state,
                message: null,
                error: null,
            };
        case CREATE_deduction_data_FAILURE:
            return {
                ...state,
                error: action.payload.message,
                message: null,
            };
        case UPDATE_deduction_data_SUCCESS:
            return {
                ...state,
                message: action.payload,
                error: null,
            };
        case UPDATE_deduction_data_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        case DELETE_deduction_data_SUCCESS:
            return {
                ...state,
                message: action.payload,
                error: null,
            };
        case DELETE_deduction_data_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        default:
            return state;
    }
};

export default DeductionDataReducer;

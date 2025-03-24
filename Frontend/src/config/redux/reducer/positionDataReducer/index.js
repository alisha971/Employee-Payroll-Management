import {
    GET_position_data_SUCCESS,
    GET_position_data_FAILURE,
    CREATE_position_data_SUCCESS,
    CREATE_position_data_FAILURE,
    UPDATE_position_data_SUCCESS,
    UPDATE_position_data_FAILURE,
    DELETE_position_data_SUCCESS,
    DELETE_position_data_FAILURE
} from '../../action/positionDataAction/positionDataActionTypes';

const initialState = {
    PositionData: [],
    message: null,
    error: null
};

const PositionDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_position_data_SUCCESS:
            return {
                ...state,
                PositionData: action.payload,
                message: null,
                error: null,
            };
        case GET_position_data_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: '',
            };
        case CREATE_position_data_SUCCESS:
            return {
                ...state,
                message: null,
                error: null,
            };
        case CREATE_position_data_FAILURE:
            return {
                ...state,
                error: action.payload.message,
                message: null,
            };
        case UPDATE_position_data_SUCCESS:
            return {
                ...state,
                message: action.payload,
                error: null,
            };
        case UPDATE_position_data_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        case DELETE_position_data_SUCCESS:
            return {
                ...state,
                message: action.payload,
                error: null,
            };
        case DELETE_position_data_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        default:
            return state;
    }
};

export default PositionDataReducer;

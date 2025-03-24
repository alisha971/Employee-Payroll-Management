import {
    GET_attendance_data_SUCCESS,
    GET_attendance_data_FAILURE,
    CREATE_attendance_data_SUCCESS,
    CREATE_attendance_data_FAILURE,
    UPDATE_attendance_data_SUCCESS,
    UPDATE_attendance_data_FAILURE,
    DELETE_attendance_data_SUCCESS,
    DELETE_attendance_data_FAILURE
} from '../../action/attendanceDataAction/attendanceDataActionTypes';

const initialState = {
    AttendanceData: [],
    loading: true,
    error: null,
    message: ''
};

const AttendanceDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_attendance_data_SUCCESS:
            return {
                ...state,
                AttendanceData: action.payload,
                loading: false,
                error: null
            };
        case GET_attendance_data_FAILURE:
            return {
                ...state,
                AttendanceData: [],
                loading: false,
                error: action.payload
            };
        case CREATE_attendance_data_SUCCESS:
            return {
                ...state,
                message: action.payload,
                loading: false,
                error: null
            };
        case CREATE_attendance_data_FAILURE:
            return {
                ...state,
                message: '',
                loading: false,
                error: action.payload
            };
        case UPDATE_attendance_data_SUCCESS:
            return {
                ...state,
                message: action.payload,
                loading: false,
                error: null
            };
        case UPDATE_attendance_data_FAILURE:
            return {
                ...state,
                message: '',
                loading: false,
                error: action.payload
            };
        case DELETE_attendance_data_SUCCESS:
            return {
                ...state,
                message: action.payload,
                loading: false,
                error: null
            };
        case DELETE_attendance_data_FAILURE:
            return {
                ...state,
                message: '',
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default AttendanceDataReducer;

import {
    FETCH_report_attendance_SUCCESS,
    FETCH_report_attendance_FAILURE,
    CLEAR_report_attendance,
} from "../../action/attendanceReportAction";

const initialState = {
    dataattendanceReport: [],
    error: null,
};

const attendanceReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_report_attendance_SUCCESS:
            return {
                ...state,
                dataattendanceReport: action.payload,
                error: null,
            };
        case FETCH_report_attendance_FAILURE:
            return {
                ...state,
                dataattendanceReport: [],
                error: action.payload,
            };
        case CLEAR_report_attendance:
            return {
                ...state,
                dataattendanceReport: [],
                error: null,
            };
        default:
            return state;
    }
};

export default attendanceReportReducer;

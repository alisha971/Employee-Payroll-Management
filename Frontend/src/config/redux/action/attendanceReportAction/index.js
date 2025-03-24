import axios from "axios";

export const FETCH_report_attendance_SUCCESS = "FETCH_report_attendance_SUCCESS";
export const FETCH_report_attendance_FAILURE = "FETCH_report_attendance_FAILURE";
export const CLEAR_report_attendance = "CLEAR_report_attendance";

export const fetchattendanceReportSuccess = (data) => ({
    type: FETCH_report_attendance_SUCCESS,
    payload: data,
});

export const fetchattendanceReportFailure = (error) => ({
    type: FETCH_report_attendance_FAILURE,
    payload: error,
});

export const clearattendanceReport = () => ({
    type: CLEAR_report_attendance,
});

export const fetchAttendanceReportByYear = (selectedYear, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/report/attendance/year/${selectedYear}`
        );
        const data = response.data;
        dispatch(fetchattendanceReportSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchattendanceReportFailure("An error occurred while loading data."));
        }
    }
};

export const fetchAttendanceReportByMonth = (selectedMonth, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/report/attendance/month/${selectedMonth}`
        );
        const data = response.data;
        dispatch(fetchattendanceReportSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchattendanceReportFailure("An error occurred while loading data."));
        }
    }
};

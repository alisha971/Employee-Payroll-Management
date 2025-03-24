import axios from 'axios';
import {
    GET_attendance_data_SUCCESS,
    GET_attendance_data_FAILURE,
    CREATE_attendance_data_SUCCESS,
    CREATE_attendance_data_FAILURE,
    UPDATE_attendance_data_SUCCESS,
    UPDATE_attendance_data_FAILURE,
    DELETE_attendance_data_SUCCESS,
    DELETE_attendance_data_FAILURE
} from './attendanceDataActionTypes';

export const getAttendanceData = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:5000/attendance_data');
            const AttendanceData = response.data;
            dispatch({
                type: GET_attendance_data_SUCCESS,
                payload: AttendanceData
            });
        } catch (error) {
            dispatch({
                type: GET_attendance_data_FAILURE,
                payload: error.message
            });
        }
    };
};

export const createAttendanceData = (EmployeeData, AttendanceData, navigate) => async (dispatch) => {
    try {
        for (let i = 0; i < EmployeeData.length; i++) {
            const isNameAda = AttendanceData.some(
                (attendance) => attendance.emp_name === EmployeeData[i].emp_name
            );

            if (!isNameAda) {
                const response = await axios.post("http://localhost:5000/attendance_data", {
                    nik: EmployeeData[i].nik,
                    emp_name: EmployeeData[i].emp_name,
                    position_name: EmployeeData[i].position,
                    gender: EmployeeData[i].gender,
                    present: present[i] || 0,
                    sick: sick[i] || 0,
                    absent: absent[i] || 0,
                });

                dispatch({
                    type: CREATE_attendance_data_SUCCESS,
                    payload: response.data,
                });

                navigate("/attendance-data");
                return response.data;
            }
        }
    } catch (error) {
        dispatch({
            type: CREATE_attendance_data_FAILURE,
            payload: error.message,
        });
        throw error;
    }
};

export const updateAttendanceData = (id, AttendanceData) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`http://localhost:5000/attendance_data/${id}`, AttendanceData);
            if (response.status === 200) {
                dispatch({
                    type: UPDATE_attendance_data_SUCCESS,
                    payload: 'Attendance Data successful Updated'
                });
                dispatch(getAttendanceData());
            } else {
                dispatch({
                    type: UPDATE_attendance_data_FAILURE,
                    payload: response.data.message
                });
            }
        } catch (error) {
            dispatch({
                type: UPDATE_attendance_data_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deleteAttendanceData = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`http://localhost:5000/attendance_data/${id}`);
            if (response.status === 200) {
                dispatch({
                    type: DELETE_attendance_data_SUCCESS,
                    payload: 'Data deleted Successfully'
                });
                dispatch(getAttendanceData());
            } else {
                dispatch({
                    type: DELETE_attendance_data_FAILURE,
                    payload: response.data.message
                });
            }
        } catch (error) {
            dispatch({
                type: DELETE_attendance_data_FAILURE,
                payload: error.message
            });
        }
    };
};

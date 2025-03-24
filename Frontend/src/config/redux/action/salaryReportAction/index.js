import axios from "axios";

export const FETCH_report_Salary_SUCCESS = "FETCH_report_Salary_SUCCESS";
export const FETCH_report_Salary_FAILURE = "FETCH_report_Salary_FAILURE";
export const CLEAR_report_Salary = "CLEAR_report_Salary";

export const fetchreportSalarySuccess = (data) => ({
    type: FETCH_report_Salary_SUCCESS,
    payload: data,
});

export const fetchreportSalaryFailure = (error) => ({
    type: FETCH_report_Salary_FAILURE,
    payload: error,
});

export const clearreportSalary = () => ({
    type: CLEAR_report_Salary,
});

export const fetchSalaryReportByYear = (selectedYear, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/report/salary/year/${selectedYear}`
        );
        const data = response.data;
        dispatch(fetchreportSalarySuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchreportSalaryFailure("An error occurred while loading data."));
        }
    }
};

export const fetchSalaryReportByMonth = (selectedMonth, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/report/salary/month/${selectedMonth}`
        );
        const data = response.data;
        dispatch(fetchreportSalarySuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchreportSalaryFailure("An error occurred while loading data."));
        }
    }
};

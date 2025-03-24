import axios from "axios";

export const FETCH_SLIP_Salary_SUCCESS = "FETCH_SLIP_Salary_SUCCESS";
export const FETCH_SLIP_Salary_FAILURE = "FETCH_SLIP_Salary_FAILURE";
export const CLEAR_SLIP_Salary = "CLEAR_SLIP_Salary";

export const fetchSalarySlipSuccess = (data) => ({
    type: FETCH_SLIP_Salary_SUCCESS,
    payload: data,
});

export const fetchSalarySlipFailure = (error) => ({
    type: FETCH_SLIP_Salary_FAILURE,
    payload: error,
});

export const clearSalarySlip = () => ({
    type: CLEAR_SLIP_Salary,
});

export const fetchSalarySlipByYear = (selectedYear, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/report/slip_Salary/year/${selectedYear}`
        );
        const data = response.data;
        dispatch(fetchSalarySlipSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchSalarySlipFailure("An error occurred while loading data."));
        }
    }
};

export const fetchSalarySlipByMonth = (selectedMonth, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/report/slip_Salary/month/${selectedMonth}`
        );
        const data = response.data;
        dispatch(fetchSalarySlipSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchSalarySlipFailure("An error occurred while loading data."));
        }
    }
};

export const fetchSalarySlipByName = (selectedName, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/report/slip_Salary/name/${selectedName}`
        );
        const data = response.data;
        dispatch(fetchSalarySlipSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchSalarySlipFailure("An error occurred while loading data."));
        }
    }
};

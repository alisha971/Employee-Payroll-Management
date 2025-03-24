import {
    FETCH_report_Salary_SUCCESS,
    FETCH_report_Salary_FAILURE,
    CLEAR_report_Salary,
} from "../../action/salaryReportAction";

const initialState = {
    salaryDataReport: [],
    error: null,
};

const reportSalaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_report_Salary_SUCCESS:
            return {
                ...state,
                salaryDataReport: action.payload,
                error: null,
            };
        case FETCH_report_Salary_FAILURE:
            return {
                ...state,
                salaryDataReport: [],
                error: action.payload,
            };
        case CLEAR_report_Salary:
            return {
                ...state,
                salaryDataReport: [],
                error: null,
            };
        default:
            return state;
    }
};

export default reportSalaryReducer;

import {
    FETCH_SLIP_Salary_SUCCESS,
    FETCH_SLIP_Salary_FAILURE,
    CLEAR_SLIP_Salary,
} from "../../action/salarySlipAction";

const initialState = {
    dataSalarySlip: [],
    error: null,
};

const salarySlipReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SLIP_Salary_SUCCESS:
            return {
                ...state,
                dataSalarySlip: action.payload,
                error: null,
            };
        case FETCH_SLIP_Salary_FAILURE:
            return {
                ...state,
                dataSalarySlip: [],
                error: action.payload,
            };
        case CLEAR_SLIP_Salary:
            return {
                ...state,
                dataSalarySlip: [],
                error: null,
            };
        default:
            return state;
    }
};

export default salarySlipReducer;

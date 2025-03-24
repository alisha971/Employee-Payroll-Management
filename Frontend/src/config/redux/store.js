import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';
import employeeSalaryDataPrintReducer from './reducer/employeeSalaryDataPrintReducer';
import EmployeeDataReducer from './reducer/employeeDataReducer';
import PositionDataReducer from './reducer/positionDataReducer';
import attendanceDataReducer from './reducer/attendanceDataReducer';
import DeductionDataReducer from './reducer/deductionDataReducer';
import salaryDataReducer from './reducer/salaryDataReducer';
import attendanceReportReducer from './reducer/attendanceReportReducer';
import reportSalaryReducer from './reducer/salaryReportReducer';
import salarySlipReducer from './reducer/salarySlipReducer';
import ubahPasswordReducer from './reducer/changePasswordReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        employeeSalaryDataPrint: employeeSalaryDataPrintReducer,
        EmployeeData: EmployeeDataReducer,
        PositionData: PositionDataReducer,
        AttendanceData: attendanceDataReducer,
        deductionData: DeductionDataReducer,
        salaryData: salaryDataReducer,
        attendanceReport: attendanceReportReducer,
        reportSalary: reportSalaryReducer,
        salarySlip: salarySlipReducer,
        ubahPassword: ubahPasswordReducer,
    },
});

export default store;

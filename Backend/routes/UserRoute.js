import express from 'express';

/* === import Middleware === */
import { adminOnly, verifyUser } from '../middleware/AuthUser.js';

/* === import Controllers === */
import {
    getEmployeeData,
    getEmployeeDataByID,
    createEmployeeData,
    updateEmployeeData,
    deleteEmployeeData,
    getEmployeeDataByNik,
    getEmployeeDataByName,
} from '../controllers/EmployeeData.js';

import {
    getPositionData,
    createPositionData,
    updatePositionData,
    deletePositionData,
    getPositionDataByID
} from "../controllers/PositionData.js";

import {
    viewAttendanceData,
    createAttendanceData,
    updateAttendanceData,
    deleteAttendanceData,
    viewAttendanceDataByID,
    viewsalaryDataByName,
} from "../controllers/TransactionController.js";

import {
    createDatasalaryDeduction,
    deleteDeductionData,
    viewDeductionDataByID,
    updateDeductionData,
    viewDeductionData
} from "../controllers/TransactionController.js";

import {
    viewemployeeSalaryData,
    viewemployeeSalaryDataByMonth,
    viewEmployeeSalaryDataByYear
} from "../controllers/TransactionController.js";

import {
    viewEmployeeAttendanceReportByMonth,
    viewEmployeeAttendanceReportByYear,
    viewEmployeeSalaryReport,
    viewEmployeeSalaryReportByMonth,
    viewEmployeeSalaryReportByName,
    viewEmployeeSalaryReportByYear,
    viewSalarySlipByMonth,
    viewSalarySlipByName,
    viewSalarySlipByYear,
} from "../controllers/ReportController.js";

import { LogOut, changePassword } from '../controllers/Auth.js';
import {
    dashboardEmployee,
    viewSingleEmployeeSalaryDataByMonth,
    viewSingleEmployeeSalaryDataByYear
} from '../controllers/Employee.js';

const router = express.Router();

// Admin Route :

/* ==== Master Data ==== */
// Employee Data
router.get('/employee_data', verifyUser, adminOnly, getEmployeeData);
router.get('/employee_data/id/:id', verifyUser, adminOnly, getEmployeeDataByID);
router.get('/employee_data/nik/:nik', verifyUser, adminOnly, getEmployeeDataByNik);
router.get('/employee_data/name/:name', verifyUser, getEmployeeDataByName);
router.post('/employee_data',verifyUser, adminOnly, createEmployeeData);
router.patch('/employee_data/:id', verifyUser, adminOnly, updateEmployeeData);
router.delete('/employee_data/:id', verifyUser, adminOnly, deleteEmployeeData);
router.patch('/employee_data/:id/change_password', verifyUser, adminOnly, changePassword);
// Position Data
router.get('/position_data', verifyUser, adminOnly, getPositionData);
router.get('/position_data/:id', verifyUser, adminOnly, getPositionDataByID);
router.post('/position_data', verifyUser, adminOnly, createPositionData);
router.patch('/position_data/:id', verifyUser, adminOnly, updatePositionData);
router.delete('/position_data/:id', verifyUser, adminOnly, deletePositionData);

/* ==== Transaction  ==== */
// Attendance Data
router.get('/attendance_data', verifyUser, adminOnly, viewAttendanceData);
router.get('/attendance_data/:id', verifyUser, adminOnly, viewAttendanceDataByID);
router.post('/attendance_data',verifyUser, adminOnly, createAttendanceData);
router.patch('/attendance_data/update/:id',verifyUser, adminOnly, updateAttendanceData);
router.delete('/attendance_data/:id', verifyUser, adminOnly, deleteAttendanceData);
// Deduction Data
router.get('/deduction_data', adminOnly, verifyUser, viewDeductionData);
router.get('/deduction_data/:id', adminOnly, verifyUser, viewDeductionDataByID);
router.post('/deduction_data', adminOnly, verifyUser, createDatasalaryDeduction);
router.patch('/deduction_data/update/:id', adminOnly, verifyUser, updateDeductionData);
router.delete('/deduction_data/:id', adminOnly, verifyUser, deleteDeductionData);
// Salary Data
router.get('/employee_salary_data', viewemployeeSalaryData);
router.get('/salary_data/name/:name', verifyUser, viewsalaryDataByName);
router.get('/employee_salary_data/month/:month', viewemployeeSalaryDataByMonth);
router.get('/employee_salary_data/year/:year', viewEmployeeSalaryDataByYear);

/* ====  report  ==== */
// Salary Report employee
router.get('/report/salary',verifyUser, adminOnly, viewEmployeeSalaryReport);
router.get('/report/salary/name/:name',verifyUser, adminOnly, viewEmployeeSalaryReportByName);
router.get('/report/salary/month/:month', verifyUser, adminOnly,viewEmployeeSalaryReportByMonth);
router.get('/report/salary/year/:year', verifyUser, adminOnly,viewEmployeeSalaryReportByYear);
// Employee Attendance Report 
router.get('/report/attendance/month/:month', verifyUser, adminOnly,viewEmployeeAttendanceReportByMonth);
router.get('/report/attendance/year/:year', verifyUser, adminOnly,viewEmployeeAttendanceReportByYear);
// Salary Slip employee
router.get('/report/slip_Salary/name/:name', verifyUser, adminOnly,viewSalarySlipByName);
router.get('/report/slip_Salary/month/:month',verifyUser, adminOnly, viewSalarySlipByMonth);
router.get('/report/slip_Salary/year/:year',verifyUser, adminOnly, viewSalarySlipByYear);

/* ==== Change Password ==== */
router.patch('/change_password', verifyUser, changePassword);

/* ==== Logout ==== */
router.delete('/logout', LogOut);

// employee Route :
/* ==== Dashboard ==== */
router.get('/dashboard', verifyUser, dashboardEmployee);
/* ==== Salary Data ==== */
router.get('/salary_data/month/:month', verifyUser, viewSingleEmployeeSalaryDataByMonth);
router.get('/salary_data/year/:year', verifyUser, viewSingleEmployeeSalaryDataByYear);
/* ==== Change Password ==== */
router.patch('/change_password', verifyUser, changePassword);
/* ==== Logout ==== */
router.delete('/logout', LogOut);


export default router;
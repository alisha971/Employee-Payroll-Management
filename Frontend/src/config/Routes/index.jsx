import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../components/molecules/NotFound'
import Home from '../../pages/Home';
import About from '../../pages/About';
import Contact from '../../pages/Contact';
import Login from '../../pages/Login';
import Dashboard from '../../pages/Dashboard';
import {
  FormAddPositionData,
  FormEditPositionData,
  FormAddAttendanceData,
  FormEditAttendanceData,
  FormAddEmployeeData,
  FormEditEmployeeData,
  FormAddDeductionData,
  FormEditDeductionData,
  PrintPdfSalaryReport,
  DetailsalaryData,
  PrintPdfSalarySlip,
  PrintPdfattendanceReport,
  PrintPdfemployeeSalaryData
} from '../../components';
import {
  EmployeeData,
  PositionData,
  AttendanceData,
  SalaryData,
  ReportSalary,
  AttendanceReport,
  SalarySlip,
  ChangePasswordAdmin,
  EmployeeSalaryData,
  ChangePasswordEmployee,
  DeductionData
} from '../../pages'

const AppRoutes = () => {
  return (

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/About' element={<About />} />
      <Route path='/Contact' element={<Contact />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />

      {/* Route Admin */}
      {/* Master Data Admin */}
      <Route
        path='/employee-data'
        element={<EmployeeData />}
      />
      <Route
        path='/employee-data/form-employee-data/add'
        element={<FormAddEmployeeData />}
      />
      <Route
        path='/employee-data/form-employee-data/edit/:id'
        element={<FormEditEmployeeData />}
      />
      <Route
        path='/position-data'
        element={<PositionData />}
      />
      <Route
        path='/position-data/form-position-data/add'
        element={<FormAddPositionData />}
      />
      <Route
        path='/position-data/form-position-data/edit/:id'
        element={<FormEditPositionData />}
      />

      {/* Transaction Admin */}
      <Route
        path='/attendance-data'
        element={<AttendanceData />}
      />
      <Route
        path='/attendance-data/form-attendance-data/add'
        element={<FormAddAttendanceData />}
      />
      <Route
        path='/attendance-data/form-attendance-data/edit/:id'
        element={<FormEditAttendanceData />}
      />
      <Route
        path='/deduction-data'
        element={<DeductionData />}
      />
      <Route
        path='/deduction-data/form-deduction-data/add'
        element={<FormAddDeductionData />} />
      <Route
        path='/deduction-data/form-deduction-data/edit/:id'
        element={<FormEditDeductionData />} />
      <Route
        path='/salary-data'
        element={<SalaryData />}
      />
      <Route
        path='/salary-data/detail-salary-data/name/:name'
        element={<DetailsalaryData />}
      />
      <Route
        path='/salary-data/Print-Salary/salary-slip/name/:name'
        element={<PrintPdfSalarySlip />}
      />

      {/* report Admin */}
      <Route
        path='/report/salary'
        element={<ReportSalary />}
      />
      <Route
        path='/report/salary/print-page'
        element={<PrintPdfSalaryReport />}
      />
      <Route
        path='/report/attendance'
        element={<AttendanceReport />}
      />
      <Route
        path='/report/attendance/print-page'
        element={<PrintPdfattendanceReport />}
      />
      <Route
        path='/report/salary-slip'
        element={<SalarySlip />}
      />
      <Route
        path='/report/salary-slip/print-page'
        element={<PrintPdfSalarySlip />}
      />

      {/* settings Admin */}
      <Route
        path='/change-password'
        element={<ChangePasswordAdmin />}
      />

      {/* Route employee */}
      {/* Dashboard Salary Data employee */}
      <Route
        path='/salary-employee-data'
        element={<EmployeeSalaryData />}
      />
      <Route
        path='/salary-employee-data/print-page'
        element={<PrintPdfemployeeSalaryData />}
      />
      <Route
        path='/change-password-employee'
        element={<ChangePasswordEmployee />}
      />

      {/* Route Not Found 404 */}
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  )
}

export default AppRoutes;

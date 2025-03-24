import React, { useRef, useEffect, useState } from "react";
import LogoPt from "../../../../assets/images/logo/logo-dark.svg";
import LogoSiPeKa from "../../../../assets/images/logo/logo-SiPeKa.png";
import { useReactToPrint } from "react-to-print";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSalaryReportByMonth,
  fetchSalaryReportByYear,
  getMe,
} from "../../../../config/redux/action";
import { ButtonOne, ButtonTwo } from "../../../atoms";

const PrintPdfSalaryReport = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlMonth = searchParams.get("month");
  const urlYear = searchParams.get("year");

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const { isError, user } = useSelector((state) => state.auth);
  const { salaryDataReport } = useSelector((state) => state.reportSalary);

  const getDataByYear = async (selectedYear) => {
    dispatch(fetchSalaryReportByYear(selectedYear));
  };

  const getDataByMonth = async (selectedMonth) => {
    dispatch(fetchSalaryReportByMonth(selectedMonth));
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Employee_salary_data",
  });

  useEffect(() => {
    if (urlYear) setYear(urlYear);
    if (urlMonth) setMonth(urlMonth);
  }, [urlMonth, urlYear]);

  useEffect(() => {
    if (year) getDataByYear(year);
    if (month) getDataByMonth(month);
  }, [year, month, dispatch]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (user && user.access_rights !== "admin") {
      navigate("/dashboard");
    } else {
      if (salaryDataReport && salaryDataReport.length > 0) {
        handlePrint();
      }
    }
  }, [isError, user, navigate, handlePrint, salaryDataReport]);

  useEffect(() => {
    const today = new Date();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    if (!urlMonth) setMonth(monthNames[today.getMonth()]);
    if (!urlYear) setYear(today.getFullYear());
  }, [urlMonth, urlYear]);

  return (
    <>
      <div className="flex flex-col md:flex-row w-full gap-3 text-center p-6 bg-white dark:bg-meta-4">
        <div>
          <ButtonOne onClick={handlePrint}>
            <span>Print</span>
          </ButtonOne>
        </div>
        <div>
          <ButtonTwo
            onClick={() => navigate(-1)}
          >
            <span>Back</span>
          </ButtonTwo>
        </div>
      </div >
      <div ref={componentRef} className="w-full h-full p-10 bg-white dark:bg-meta-4">
        <div className="flex items-center gap-24 object-cover border-b-4 border-black dark:border-white">
          <img className="w-35" src={LogoSiPeKa} title="Logo" alt="Logo" />
          <h1 className="text-black text-2xl font-bold dark:text-white">
            MyPayroll
          </h1>
          <img className="w-35" src={LogoPt} title="Logo " alt="Logo " />
        </div>
        <h1 className="text-center text-black my-4 text-xl font-medium py-2 dark:text-white">
          Employee Salary Data
        </h1>
        <div className="w-full md:text-lg">
          <h2 className="font-medium mb-4 block text-black dark:text-white">
            <span className="inline-block w-32 md:w-40">Month</span>
            <span className="inline-block w-7">:</span>
            {month}
          </h2>
          <h2 className="font-medium mb-4 block text-black dark:text-white">
            <span className="inline-block w-32 md:w-40">Year</span>
            <span className="inline-block w-7">:</span>
            {year}
          </h2>
        </div>
        <div className="max-w-full overflow-x-auto py-4">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="font-medium text-black border-b border-t border-l  border-black dark:border-white dark:text-white">No</th>
                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">NIK</th>
                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">Employee Name</th>
                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">Position</th>
                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">Basic Salary</th>
                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">Transport Allowance</th>
                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">Meal Allowance</th>
                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">Deduction</th>
                <th className="font-medium text-black border-t border-l border-b border-r border-black dark:border-white dark:text-white">Total Salary</th>
              </tr>
            </thead>
            <tbody>
              {salaryDataReport.map((data, index) => (
                <tr key={index}>
                  <td className="border-b border-l border-black dark:border-white py-5 text-center">
                    <p className="text-black dark:text-white">{index + 1}</p>
                  </td>
                  <td className="border-b border-l border-black dark:border-white py-5 text-center">
                    <p className="text-black dark:text-white">{data.nik}</p>
                  </td>
                  <td className="border-b border-l border-black dark:border-white py-5 text-center">
                    <p className="text-black dark:text-white">{data.emp_name}</p>
                  </td>
                  <td className="border-b border-l border-black dark:border-white py-5 text-center">
                    <p className="text-black dark:text-white">{data.position_name}</p>
                  </td>
                  <td className="border-b border-l border-black dark:border-white py-5 text-center">
                    <p className="text-black dark:text-white">Rs. {data.basic_salary}</p>
                  </td>
                  <td className="border-b border-l border-black dark:border-white py-5 text-center">
                    <p className="text-black dark:text-white">Rs. {data.transport_allowance}</p>
                  </td>
                  <td className="border-b border-l border-black dark:border-white py-5 text-center">
                    <p className="text-black dark:text-white">Rs. {data.meal_allowance}</p>
                  </td>
                  <td className="border-b border-l border-black dark:border-white py-5 text-center">
                    <p className="text-black dark:text-white">Rs. {data.deduction_amt}</p>
                  </td>
                  <td className="border-b border-l border-r border-black dark:border-white py-5 text-center">
                    <p className="text-black dark:text-white">Rs. {data.total_salary}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="py-6">
          <div className="font-medium text-black text-right dark:text-white">
            <span>{`${new Date().getDate()} ${month} ${year}`}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintPdfSalaryReport;

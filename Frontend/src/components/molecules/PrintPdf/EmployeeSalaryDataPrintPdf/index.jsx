import React, { useRef, useEffect, useState } from "react";
import LogoPt from "../../../../assets/images/logo/logo-dark.svg";
import LogoSiPeKa from "../../../../assets/images/logo/logo-SiPeKa.png";
import { useReactToPrint } from "react-to-print";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMe, viewSingleEmployeeSalaryByName } from "../../../../config/redux/action";
import { ButtonOne, ButtonTwo } from "../../../atoms";

const PrintPdfEmployeeSalaryData = () => {
    const componentRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryMonth = searchParams.get("month");
    const queryYear = searchParams.get("year");
    
    const [month, setMonth] = useState(queryMonth || "");
    const [year, setYear] = useState(queryYear || "");

    const { isError, user } = useSelector((state) => state.auth);
    const { emp_name } = useSelector((state) => state.auth.user) || {};
    const employeeSalaryData = useSelector((state) => state.employeeSalaryDataPrint.employeeSalaryDataPrint);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Employee_Salary_Slip",
    });

    useEffect(() => {
        if (emp_name && emp_name.trim() !== "") {
            dispatch(viewSingleEmployeeSalaryByName(emp_name));
        }
    }, [dispatch, emp_name]);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/login");
        } else if (user && user.access_rights !== "employee") {
            navigate("/dashboard");
        }
    }, [isError, user, navigate]);

    useEffect(() => {
        if (!queryMonth || !queryYear) {
            const today = new Date();
            const monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            setMonth(monthNames[today.getMonth()]);
            setYear(today.getFullYear());
        }
    }, [queryMonth, queryYear]);

    return (
        <>
            <div className="flex flex-col md:flex-row w-full gap-3 text-center p-6 bg-white dark:bg-meta-4">
                <div>
                    <ButtonOne onClick={handlePrint}>
                        <span>Print</span>
                    </ButtonOne>
                </div>
                <Link to="/salary-employee-data">
                    <ButtonTwo>
                        <span>Back</span>
                    </ButtonTwo>
                </Link>
            </div >
            <div ref={componentRef}>
                {employeeSalaryData.map((data, index) => (
                    <div key={index} className="w-200% h-100% p-10 bg-white dark:bg-meta-4">
                        <div className="flex items-center gap-24 object-cover border-b-4 border-black dark:border-white">
                            <img className="w-35" src={LogoSiPeKa} alt="Logo SiPeKa" />
                            <h1 className="text-black text-2xl font-bold dark:text-white">MyPayroll</h1>
                            <img className="w-35" src={LogoPt} alt="Logo" />
                        </div>
                        <h1 className="text-center text-black dark:text-white my-4 text-xl font-medium py-2">
                            Employee Salary Data
                        </h1>
                        <div className="w-full md:text-lg">
                            <h2 className="font-medium mb-4 block text-black dark:text-white">
                                <span className="inline-block w-32 md:w-40">Employee Name</span>
                                <span className="inline-block w-7">:</span>
                                {data.emp_name}
                            </h2>
                            <h2 className="font-medium mb-4 block text-black dark:text-white">
                                <span className="inline-block w-32 md:w-40">NIK</span>
                                <span className="inline-block w-7">:</span>
                                {data.nik}
                            </h2>
                            <h2 className="font-medium mb-4 block text-black dark:text-white">
                                <span className="inline-block w-32 md:w-40">Position</span>
                                <span className="inline-block w-7">:</span>
                                {data.position}
                            </h2>
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
                                    <tr className="bg-white text-left dark:bg-meta-4">
                                        <th className="py-4 border-t border-l font-medium text-center text-black dark:text-white">No</th>
                                        <th className="py-4 px-4 border-t border-l text-center font-medium text-black dark:text-white">Description</th>
                                        <th className="py-4 px-4 border-t border-l border-r text-center font-medium text-black dark:text-white">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="dark:border-white">
                                        <td className="border-b border-black border-t border-l dark:border-white py-5 text-center text-black dark:text-white">
                                            {index + 1}
                                        </td>
                                        <td className="border-b border-black border-t border-l dark:border-white py-5 px-4 text-black dark:text-white">Basic Salary</td>
                                        <td className="border-b border-black border-t border-l border-r dark:border-white py-5 px-4 text-black dark:text-white">Rs. {data.basic_salary}</td>
                                    </tr>
                                    {/* Repeat for other rows */}
                                    <tr className="dark:border-white">
                                        <td className="border-b border-black border-t border-l dark:border-white py-5 px-4"></td>
                                        <td className="font-medium border-b border-black dark:border-white py-5 px-2 text-right text-black dark:text-white">Total Salary :</td>
                                        <td className="font-medium border-b border-black border-l border-r dark:border-white py-5 px-4 text-black dark:text-white">Rs. {data.total}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="py-6 flex justify-between items-center">
                            <div className="font-medium text-black dark:text-white">
                                <span className="p-6">Employee</span>
                                <span>{emp_name}</span>
                            </div>
                            <div className="font-medium text-black dark:text-white text-right">
                                <span>{`${new Date().getDate()} ${month} ${year}`}</span>
                                <br />
                                <span>Finance</span>
                                <br /><br />
                                <span className="p-8 italic">Signature</span>
                            </div>
                        </div>
                        <div className="italic text-black dark:text-white mt-30">
                            Printed On : {`${new Date().getDate()} ${month} ${year}`}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default PrintPdfEmployeeSalaryData;

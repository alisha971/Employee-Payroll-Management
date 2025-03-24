import React, { useRef, useEffect, useState } from "react";
import LogoPt from "../../../../assets/images/logo/logo-dark.svg";
import LogoSiPeKa from "../../../../assets/images/logo/logo-SiPeKa.png";
import { useReactToPrint } from "react-to-print";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAttendanceReportByMonth,
    fetchAttendanceReportByYear,
    getMe
} from "../../../../config/redux/action";
import { ButtonOne, ButtonTwo } from "../../../atoms";

const PrintPdfattendanceReport = () => {
    const componentRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    const { isError, user } = useSelector((state) => state.auth);
    const { dataattendanceReport } = useSelector((state) => state.attendanceReport);

    const getDataByYear = async (selectedYear) => {
        dispatch(fetchAttendanceReportByYear(selectedYear));
    };

    const getDataByMonth = async (selectedMonth) => {
        dispatch(fetchAttendanceReportByMonth(selectedMonth));
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Employee_Attendance_Report",
    });

    useEffect(() => {
        if (year && month) {
            getDataByYear(year);
            getDataByMonth(month);
        }
    }, [year, month]);

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
            handlePrint();
        }
    }, [isError, user, navigate, handlePrint]);

    return (
        <>
            <div className="flex flex-col md:flex-row w-full gap-3 text-center p-6 bg-white dark:bg-meta-4">
                <div>
                    <ButtonOne onClick={handlePrint}>
                        <span>Print</span>
                    </ButtonOne>
                </div>
                <Link to="/report/attendance">
                    <ButtonTwo>
                        <span>Back</span>
                    </ButtonTwo>
                </Link>
            </div>
            <div ref={componentRef} className="w-200% h-100% p-10 bg-white dark:bg-meta-4">
                <div className="flex items-center gap-24 object-cover border-b-4 border-black dark:border-white">
                    <img className="w-35"
                        src={LogoSiPeKa}
                        title="Logo SiPeKa"
                        alt="Logo SiPeKa" />
                    <h1 className="text-black text-2xl font-bold boder  dark:text-white">
                        MyPayroll
                    </h1>
                    <img className="w-35"
                        src={LogoPt}
                        title="Logo"
                        alt="Logo"
                    />
                </div>
                <h1 className="text-center text-black my-4 text-xl font-medium boder py-2 dark:text-white">
                    Employee Attendance Report
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
                    <table className="w-full table-auto-full">
                        <thead>
                            <tr>
                                <th className="font-medium text-black border-b border-t border-l  border-black dark:border-white dark:text-white">
                                    No
                                </th>
                                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                                    NIK
                                </th>
                                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                                    Employee <br /> Name
                                </th>
                                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                                    Position
                                </th>
                                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                                    Present
                                </th>
                                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                                    Sick
                                </th>
                                <th className="font-medium text-black border-t border-l border-b border-r border-black dark:border-white dark:text-white">
                                    Absent
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataattendanceReport.map((data, index) => {
                                return (
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
                                            <p className="text-black dark:text-white">{data.present}</p>
                                        </td>
                                        <td className="border-b border-l border-black dark:border-white py-5 text-center">
                                            <p className="text-black dark:text-white">{data.sick}</p>
                                        </td>
                                        <td className="border-b border-l border-r border-black dark:border-white py-5 text-center">
                                            <p className="text-black dark:text-white">{data.absent}</p>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="py-6">
                    <div className="font-medium text-black text-right dark:text-white">
                        <span>{`${new Date().getDate()} ${month} ${year}`}</span>
                        <br />
                        <span className="p-26">Finance</span>
                        <br />
                        <br />
                        <span className="p-8 italic text-black dark:text-white">Signature</span>
                    </div>
                </div>
                <div className="italic text-black dark:text-white mt-70">
                    Printed On : {`${new Date().getDate()} ${month} ${year}`}
                </div>
            </div>
        </>
    );
};

export default PrintPdfattendanceReport;

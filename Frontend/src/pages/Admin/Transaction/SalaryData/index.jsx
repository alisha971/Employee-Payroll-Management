import { useState, useEffect } from 'react';
import Layout from '../../../../layout';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, ButtonOne } from '../../../../components';
import { FaRegEye } from 'react-icons/fa'
import { BiSearch } from 'react-icons/bi'
import Swal from 'sweetalert2';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { TfiPrinter } from 'react-icons/tfi'
import { fetchSalaryReportByMonth, fetchSalaryReportByYear, getsalaryData, getMe } from '../../../../config/redux/action';

const ITEMS_PER_PAGE = 4;

const SalaryData = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteryear, setFilteryear] = useState("");
    const [filtermonth, setFiltermonth] = useState("");
    const [filterName, setFilterName] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const { salaryData } = useSelector((state) => state.salaryData);
    const { isError, user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const totalPages = Math.ceil(salaryData.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const filteredSalaryData = salaryData.filter((SalaryEmployeeData) => {
        const isMatchmonth =
            filtermonth === "" ||
            (typeof SalaryEmployeeData.month === 'string' &&
                SalaryEmployeeData.month.toLowerCase().includes(filtermonth.toLowerCase()));
        const isMatchyear =
            filteryear === "" || SalaryEmployeeData.year.toString() === filteryear;
        const isMatchName =
            filterName === "" ||
            (typeof SalaryEmployeeData.emp_name === 'string' &&
                SalaryEmployeeData.emp_name.toLowerCase().includes(filterName.toLowerCase()));
        return isMatchmonth && isMatchyear && isMatchName;
    });

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlemonthChange = (event) => {
        setFiltermonth(event.target.value);
    };

    const handleyearChange = (event) => {
        setFilteryear(event.target.value);
    };

    const handleNameChange = (event) => {
        setFilterName(event.target.value);
    };

    const handleSearch = async (event) => {
        event.preventDefault();

        const selectedMonth = filtermonth;
        const selectedYear = filteryear;

        let yearDataFound = false;
        let monthDataFound = false;

        await Promise.all([
            dispatch(fetchSalaryReportByYear(selectedYear, () => (yearDataFound = true))),
            dispatch(fetchSalaryReportByMonth(selectedMonth, () => (monthDataFound = true))),
        ]);
        setShowMessage(true);

        if (yearDataFound && monthDataFound) {
            setShowMessage(false);
            navigate(
                `/report/salary/print-page?month=${selectedMonth}&year=${selectedYear}`
            );
        } else {
            setShowMessage(false);
            Swal.fire({
                icon: 'error',
                title: 'Data not found',
                text: 'Sorry, the data you searched for was not found.',
                timer: 2000,
            });
        }
    };

    useEffect(() => {
        dispatch(getsalaryData(startIndex, endIndex));
    }, [dispatch, startIndex, endIndex]);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate('/login');
        }
        if (user && user.access_rights !== 'admin') {
            navigate('/dashboard');
        }
    }, [isError, user, navigate]);

    const paginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;

        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        for (let page = startPage; page <= endPage; page++) {
            items.push(
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`py-2 px-4 border border-gray-2 text-black font-semibold dark:text-white dark:border-strokedark ${currentPage === page ? 'bg-primary text-white hover:bg-primary dark:bg-primary dark:hover:bg-primary' : 'hover:bg-gray-2 dark:hover:bg-stroke'
                        } rounded-lg`}
                >
                    {page}
                </button>
            );
        }

        if (startPage > 2) {
            items.unshift(
                <p
                    key="start-ellipsis"
                    className="py-2 px-4 border border-gray-2 dark:bg-transparent text-black font-medium bg-gray dark:border-strokedark dark:text-white"
                >
                    ...
                </p>
            );
        }

        if (endPage < totalPages - 1) {
            items.push(
                <p
                    key="end-ellipsis"
                    className="py-2 px-4 border border-gray-2 dark:bg-transparent text-black font-medium bg-gray dark:border-strokedark dark:text-white"
                >
                    ...
                </p>
            );
        }

        return items;
    };
    return (
        <Layout>
            <Breadcrumb pageName='Employee Salary Data' />

            <div className='rounded-sm border border-stroke bg-white px-5 pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-10 mt-6'>
                <div className='border-b border-stroke py-2 dark:border-strokedark'>
                    <h3 className='font-medium text-black dark:text-white'>
                        Filter Employee Salary Data
                    </h3>
                </div>
                <form onSubmit={handleSearch}>
                    {showMessage && (
                        <p className="text-meta-1">Data not found</p>
                    )}
                    <div className='flex flex-col md:flex-row md:justify-between items-center mt-4'>
                        <div className='relative w-full md:w-1/2 md:mr-2 mb-4 md:mb-0'>
                            <div className='relative'>
                                <span className='px-6'>Month</span>
                                <span className='absolute top-1/2 left-70 z-30 -translate-y-1/2 text-xl'>
                                    <MdOutlineKeyboardArrowDown />
                                </span>
                                <select
                                    value={filtermonth}
                                    onChange={handlemonthChange}
                                    required
                                    className='relative appearance-none rounded border border-stroke bg-transparent py-2 px-18 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input'
                                >
                                    <option value=''>Choose month</option>
                                    <option value='January'>January</option>
                                    <option value='February'>February</option>
                                    <option value='March'>March</option>
                                    <option value='April'>April</option>
                                    <option value='May'>May</option>
                                    <option value='June'>June</option>
                                    <option value='July'>July</option>
                                    <option value='August'>August</option>
                                    <option value='September'>September</option>
                                    <option value='October'>October</option>
                                    <option value='November'>November</option>
                                    <option value='December'>December</option>
                                </select>
                            </div>
                        </div>
                        <div className='relative w-full md:w-1/2 md:mr-2 mb-4 md:mb-0'>
                            <div className='relative'>
                                <span className='px-6'>Year</span>
                                <input
                                    type='number'
                                    placeholder='Enter year...'
                                    value={filteryear}
                                    onChange={handleyearChange}
                                    required
                                    className='rounded border-[1.5px] border-stroke bg-transparent py-2 pl-10 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary left-0'
                                />
                                <span className='absolute left-25 py-3 text-xl '>
                                    <BiSearch />
                                </span>
                            </div>
                        </div>
                        <div className='w-full md:w-1/2 flex justify-center md:justify-end'>
                            <div className='w-full md:w-auto'>
                                <ButtonOne type='submit'>
                                    <span>Print Salary Data</span>
                                    <span>
                                        <TfiPrinter />
                                    </span>
                                </ButtonOne>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="bg-gray-2 text-left dark:bg-meta-4 mt-6">
                    {filteredSalaryData
                        .reduce((uniqueEntries, data) => {
                            const isEntryExist = uniqueEntries.find(entry => entry.month === data.month && entry.year === data.year);
                            if (!isEntryExist) {
                                uniqueEntries.push(data);
                            }
                            return uniqueEntries;
                        }, []).map(data => (data.year !== 0 && data.month !== 0 &&
                            <h2 className="px-4 py-2 text-black dark:text-white" key={`${data.month}-${data.year}`}>
                                Displaying Employee Salary Data month :
                                <span className="font-medium"> {data.month} </span>
                                year :
                                <span className="font-medium"> {data.year}</span>
                            </h2>
                        ))}
                </div>

            </div>

            <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-6'>
                <div className="flex justify-between items-center mt-4 flex-col md:flex-row md:justify-between">
                    <div className="relative flex-2 mb-4 md:mb-0">
                        <input
                            type='text'
                            placeholder='Seach Employee Name...'
                            value={filterName}
                            onChange={handleNameChange}
                            className='rounded-lg border-[1.5px] border-stroke bg-transparent py-2 pl-10 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary left-0'
                        />
                        <span className='absolute left-2 py-3 text-xl'>
                            <BiSearch />
                        </span>
                    </div>
                </div>

                <div className='max-w-full overflow-x-auto py-4'>
                    <table className='w-full table-auto-full'>
                        <thead>
                            <tr className='bg-gray-2  dark:bg-meta-4'>
                                <th className='py-2 px-2 font-medium text-black dark:text-white'>
                                    No
                                </th>
                                <th className='py-2 px-2 font-medium text-black dark:text-white'>
                                    NIK
                                </th>
                                <th className='py-2 px-2 font-medium text-black dark:text-white'>
                                    Employee <br /> Name
                                </th>
                                <th className='py-2 px-2 font-medium text-black dark:text-white'>
                                    Position
                                </th>
                                <th className='py-2 px-2 font-medium text-black dark:text-white'>
                                    Basic <br /> Salary
                                </th>
                                <th className='py-2 px-2 font-medium text-black dark:text-white'>
                                    Transport <br />Allowance
                                </th>
                                <th className='py-2 px-2 font-medium text-black dark:text-white'>
                                    Meal <br /> Allowance
                                </th>
                                <th className='py-2 px-2 font-medium text-black dark:text-white'>
                                    Deduction
                                </th>
                                <th className='py-2 px-2 font-medium text-black dark:text-white'>
                                    Total <br /> Salary
                                </th>
                                <th className='py-2 px-2 font-medium text-black dark:text-white'>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSalaryData.slice(startIndex, endIndex).map((data, index) => {
                                return (
                                    <tr key={data.id}>
                                        <td className='border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>{startIndex + index + 1}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>{data.nik}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>{data.emp_name}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>{data.position}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>Rs. {data.basic_salary}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>Rs. {data.transport_allowance}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>Rs. {data.meal_allowance}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>Rs. {data.deduction}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>Rs. {data.total}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark'>
                                            <div className='flex items-center space-x-3.5'>
                                                <Link
                                                    className='hover:text-black'
                                                    to={`/salary-data/detail-salary-data/name/${data.emp_name}`}
                                                >
                                                    <FaRegEye className="text-primary text-xl hover:text-black dark:hover:text-white" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center mt-4 flex-col md:flex-row md:justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-5 dark:text-gray-4 text-sm py-4">
                            Displaying {startIndex + 1}-{Math.min(endIndex, filteredSalaryData.length)} data {filteredSalaryData.length} Employee Salary Data
                        </span>
                    </div>
                    <div className="flex space-x-2 py-4">
                        <button
                            disabled={currentPage === 1}
                            onClick={goToPrevPage}
                            className="py-2 px-6 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white dark:text-white dark:border-primary dark:hover:bg-primary dark:hover:text-white disabled:opacity-50"
                        >
                            < MdKeyboardDoubleArrowLeft />
                        </button>
                        {paginationItems()}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={goToNextPage}
                            className="py-2 px-6 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white dark:text-white dark:border-primary dark:hover:bg-primary dark:hover:text-white disabled:opacity-50"
                        >
                            < MdKeyboardDoubleArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SalaryData;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Breadcrumb, ButtonOne, ButtonTwo } from '../../../..';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../../../layout';
import axios from 'axios';
import { getMe } from '../../../../../config/redux/action';
import Swal from 'sweetalert2';

const FormEditEmployeeData = () => {
    const [nik, setNik] = useState('');
    const [nameemployee, setNameemployee] = useState('');
    const [username, setUsername] = useState('');
    const [Gender, setGender] = useState('');
    const [position, setposition] = useState('');
    const [JoinDate, setJoinDate] = useState('');
    const [status, setStatus] = useState('');
    const [AccessRights, setAccessRights] = useState('');
    const [msg, setMsg] = useState('');
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('nik', nik);
            formData.append('emp_name', nameemployee);
            formData.append('username', username);
            formData.append('gender', Gender);
            formData.append('position', position);
            formData.append('join_date', JoinDate);
            formData.append('status', status);
            formData.append('access_rights', AccessRights);

            const response = await axios.patch(`http://localhost:5000/employee_data/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMsg(response.data.msg);
            Swal.fire({
                icon: 'success',
                title: 'successful',
                timer: 1500,
                text: response.data.msg
            });
            navigate('/employee-data');
        } catch (error) {
            setMsg(error.response.data.msg);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response.data.msg
            });
        }
    };
    
    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/employee_data/id/${id}`);
                const data = response.data;
                setNik(data.nik);
                setNameemployee(data.emp_name);
                setUsername(data.username);
                setGender(data.gender);
                setposition(data.position);
                setJoinDate(data.join_date);
                setStatus(data.status);
                setAccessRights(data.access_rights);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getUserById();
    }, [id]);

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

    return (
        <Layout>
            <Breadcrumb pageName='Form Edit employee' />
            <div className='sm:grid-cols-2'>
                <div className='flex flex-col gap-9'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Edit Employee Data Form 
                            </h3>
                        </div>
                        <form onSubmit={updateUser}>
                            <p className='text-meta-1'>{msg}</p>
                            <div className='p-6.5'>
                                <div className='mb-4.5 flex flex-col gap-6 xl:flex-row'>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            NIK <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='number'
                                            id='nik'
                                            name='nik'
                                            value={nik}
                                            onChange={(e) => setNik(e.target.value)}
                                            required
                                            placeholder='Enter nik'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>

                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Full Name<span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='nameemployee'
                                            name='nameemployee'
                                            value={nameemployee}
                                            onChange={(e) => setNameemployee(e.target.value)}
                                            required={true}
                                            placeholder='Enter full name'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Username <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='username'
                                            id='username'
                                            name='username'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required={true}
                                            placeholder='Enter username'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>

                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Gender <span className='text-meta-1'>*</span>
                                        </label>
                                        <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                            <select className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                id='Gender'
                                                name='Gender'
                                                value={Gender}
                                                onChange={(e) => setGender(e.target.value)}
                                                required={true}
                                            >
                                                <option value='' disabled={true}>Choose Gender</option>
                                                <option value='Male'>Male</option>
                                                <option value='Female'>Female</option>
                                            </select>
                                            <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
                                                <MdOutlineKeyboardArrowDown />
                                            </span>
                                        </div>
                                    </div>

                                </div>
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Position <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='position'
                                            name='position'
                                            value={position}
                                            onChange={(e) => setposition(e.target.value)}
                                            required={true}
                                            placeholder='Enter position'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Join Date <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='date'
                                            id='JoinDate'
                                            name='JoinDate'
                                            value={JoinDate}
                                            onChange={(e) => setJoinDate(e.target.value)}
                                            required={true}
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Status <span className='text-meta-1'>*</span>
                                        </label>
                                        <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                            <select className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                id='status'
                                                name='status'
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                                required={true}
                                            >
                                                <option value='' disabled={true}>Choose status</option>
                                                <option value='Permanent Employee'>Permanent Employee</option>
                                                <option value='Non-Permanent Employee'>Non-Permanent Employee</option>
                                            </select>
                                            <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
                                                <MdOutlineKeyboardArrowDown />
                                            </span>
                                        </div>
                                    </div>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Access Rights <span className='text-meta-1'>*</span>
                                        </label>
                                        <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                            <select className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                id='access_rights'
                                                name='access_rights'
                                                value={AccessRights}
                                                onChange={(e) => setAccessRights(e.target.value)}
                                                required={true}
                                            >
                                                <option value='' disabled={true}>Choose Access Rights</option>
                                                <option value='admin'>admin</option>
                                                <option value='employee'>employee</option>
                                            </select>
                                            <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
                                                <MdOutlineKeyboardArrowDown />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col md:flex-row w-full gap-3 text-center'>
                                    <div>
                                        <ButtonOne  >
                                            <span>Update</span>
                                        </ButtonOne>
                                    </div>
                                    <Link to="/employee-data" >
                                        <ButtonTwo  >
                                            <span>Back</span>
                                        </ButtonTwo>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default FormEditEmployeeData;

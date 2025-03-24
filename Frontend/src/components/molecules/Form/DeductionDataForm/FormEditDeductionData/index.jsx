import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import Layout from '../../../../../layout';
import { Breadcrumb, ButtonOne, ButtonTwo } from '../../../../../components';
import { getMe } from '../../../../../config/redux/action';

const FormEditDeductionData = () => {
    const [deduction, setdeduction] = useState('');
    const [deductionAmt, setdeductionAmt] = useState('');
    const [msg, setMsg] = useState('');
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isError, user } = useSelector((state) => state.auth);

    const updateDeductionData = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('deduction', deduction);
            formData.append('deduction_amt', deductionAmt);

            const response = await axios.patch(`http://localhost:5000/deduction_data/update/${id}`, formData, {
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
            navigate('/deduction-data');
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
        const getDataById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/deduction_data/${id}`);
                setdeduction(response.data.deduction);
                setdeductionAmt(response.data.deduction_amt);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        }
        getDataById();
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
            <Breadcrumb pageName='Edit Deduction Data Form' />

            <div className='sm:grid-cols-2'>
                <div className='flex flex-col gap-9'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Edit Deduction Data Form
                            </h3>
                        </div>
                        <form onSubmit={updateDeductionData}>
                            <div className='p-6.5'>
                                <div className='mb-4.5 '>
                                    <div className='w-full mb-4'>
                                        <label className='mb-4 block text-black dark:text-white'>
                                            Deduction <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='deduction'
                                            name='deduction'
                                            value={deduction}
                                            onChange={(e) => setdeduction(e.target.value)}
                                            required={true}
                                            placeholder='Enter deduction'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>

                                    <div className='w-full mb-4'>
                                        <label className='mb-4 block text-black dark:text-white'>
                                            Amount <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='number'
                                            id='deductionAmt'
                                            name='deductionAmt'
                                            value={deductionAmt}
                                            onChange={(e) => setdeductionAmt(e.target.value)}
                                            required
                                            placeholder='Enter Amount'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>

                                <div className='flex flex-col md:flex-row w-full gap-3 text-center'>
                                    <div>
                                        <ButtonOne  >
                                            <span>Update</span>
                                        </ButtonOne>
                                    </div>
                                    <Link to="/deduction-data" >
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

export default FormEditDeductionData;

import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SunmaryApi';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showconfirmPassword, setShowConfirmPassword] = useState(false)
    const valideValue = Object.values(data).every(el => el)

    useEffect(() => {
        if (!(location?.state?.data?.success)) {
            navigate("/")
        }
        if (location?.state?.email) {
            setData((preve) => {
                return {
                    ...preve,
                    email: location?.state?.email
                }
            })
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (data.newPassword !== data.confirmPassword) {
            toast.error("New password and confirm password must be same")
            return
        }

        try {
            const response = await Axios({
                ...SummaryApi.reset_password,
                data: data
            })

            if (response.data.error) {
                toast.error(response.data.message)
            }

            if (response.data.success) {
                toast.success(response.data.message)
                setData({
                    email: "",
                    newPassword: "",
                    confirmPassword: ""
                })
                navigate("/login")
            }

        } catch (error) {
            AxiosToastError(error)
        }

    }

    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p className='font-semibold text-lg'>Enter Your Password</p>
                <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id='email'
                            className='bg-blue-50 p-2 border rounded outline-none'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                            readOnly
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="newPassword">New password</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-[#ffbf00]'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='newPassword'
                                className='w-full outline-none '
                                name='newPassword'
                                value={data.newPassword}
                                onChange={handleChange}
                                placeholder='Enter your new password'
                                autoFocus
                            />
                            <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showPassword ? (<FaRegEye />) : (<FaRegEyeSlash />)
                                }
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="confirmPassword">ConfirmPassword</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-[#ffbf00]'>
                            <input
                                type={showconfirmPassword ? "text" : "password"}
                                id='confirmPassword'
                                className='w-full outline-none '
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder='Enter your confirm password'
                            />
                            <div onClick={() => setShowConfirmPassword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showconfirmPassword ? (<FaRegEye />) : (<FaRegEyeSlash />)
                                }
                            </div>
                        </div>
                    </div>

                    <button disabled={!valideValue} className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}>
                        Change Password
                    </button>

                </form>

                {/* <p>
                    Already have account ? <Link
                        to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>
                        Login
                    </Link>
                </p> */}
            </div>
        </section>
    )
}

export default ResetPassword
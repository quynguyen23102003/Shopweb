import React from 'react'
import { IoClose } from 'react-icons/io5'
import { useForm } from "react-hook-form"
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SunmaryApi'
import toast from 'react-hot-toast'
import { useGlobalContext } from '../provider/Globalprovider'

const AddAddress = ({ close }) => {
    const { register, handleSubmit, reset } = useForm()
    const { fetchAddress } = useGlobalContext()

    const onSubmit = async (data) => {
        try {
            const response = await Axios({
                ...SummaryApi.addAddress,
                data: {
                    address_line: data.addressline,
                    city: data.city,
                    state: data.state,
                    pincode: data.pincode,
                    country: data.country,
                    mobile: data.mobile
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast(responseData.message)
                if (close) {
                    close()
                    reset()
                    fetchAddress()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-800/60 z-50 overflow-auto'>
            <div className='bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-semibold'>Add Address</h2>
                    <button onClick={close} className='text-neutral-800 w-fit'>
                        <IoClose size={25} />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='mt-4 grid gap-4'>
                    <div className='grid gap-1'>
                        <label htmlFor="addressline">Address Line :</label>
                        <input
                            type="text"
                            id='addressline'
                            placeholder='Enter your address line'
                            className='bg-blue-50 border border-gray-300 p-2 rounded'
                            autoFocus
                            {...register("addressline", { required: true })}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='city'>City :</label>
                        <input
                            type='text'
                            id='city'
                            placeholder='Enter your city'
                            className='bg-blue-50 border border-gray-300 p-2 rounded'
                            {...register("city", { required: true })}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="state">State :</label>
                        <input
                            type="text"
                            id='state'
                            placeholder='Enter your state'
                            className='bg-blue-50 border border-gray-300 p-2 rounded'
                            {...register("state", { required: true })}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="pincode">Pincode :</label>
                        <input
                            type="text"
                            id='pincode'
                            placeholder='Enter your pincode'
                            className='bg-blue-50 border border-gray-300 p-2 rounded'
                            {...register("pincode", { required: true })}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="country">Country :</label>
                        <input
                            type="text"
                            id='country'
                            placeholder='Enter your country'
                            className='bg-blue-50 border border-gray-300 p-2 rounded'
                            {...register("country", { required: true })}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="mobile">Mobile No. :</label>
                        <input
                            type="text"
                            id='mobile'
                            placeholder='Enter your mobile'
                            className='bg-blue-50 border border-gray-300 p-2 rounded'
                            {...register("mobile", { required: true })}
                        />
                    </div>
                    <button type='submit' className='bg-[#ffbf00] w-full py-2 font-semibold mt-4 hover:bg-[#ffc929]'>Submit</button>
                </form>
            </div>
        </section>
    )
}

export default AddAddress
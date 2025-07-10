import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAddress from '../components/AddAddress'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditAddressDetails from '../components/EditAddressDetails';
import { useGlobalContext } from '../provider/Globalprovider'
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SunmaryApi';
import toast from 'react-hot-toast';

const Address = () => {
  const addressList = useSelector(state => state.address.addressList)
  const [openAddAddress, setOpenAddAddress] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({})
  const { fetchAddress } = useGlobalContext()

  const handleDeleteAddress = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteAddress,
        data: {
          _id: id
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        fetchAddress()
      }

    } catch (error) {
      console.log("error", error)
      AxiosToastError(error)
    }
  }

  return (
    <div className=''>
      <div className='bg-white shadow-md p-2 flex justify-between items-center gap-4'>
        <h2 className='font-semibold text-ellipsis line-clamp-1'>Address</h2>
        <button onClick={() => setOpenAddAddress(true)} className='border border-[#ffbf00] text-[#ffbf00] px-2 py-1 rounded-full hover:bg-[#ffbf00] hover:text-black'>
          Add address
        </button>
      </div>
      <div className='bg-blue-50 p-2 grid gap-4'>
        {
          addressList.map((address, index) => {
            return (
              <div key={index + "Address"} className={`border rounded border-gray-300 p-3 flex justify-between gap-3 bg-white ${!address.status && 'hidden'}`}>
                <div className='w-full'>
                  <p>{address.address_line}</p>
                  <p>{address.city}</p>
                  <p>{address.state}</p>
                  <p>{address.country} - {address.pincode}</p>
                  <p>{address.mobile}</p>
                </div>
                <div className='grid gap-10'>
                  <button onClick={() => {
                    setOpenEdit(true)
                    setEditData(address)
                  }} className='bg-green-200 p-1 rounded hover:text-white hover:bg-green-600'>
                    <MdEdit size={20} />
                  </button>
                  <button onClick={() => handleDeleteAddress(address._id)} className='bg-red-200 p-1 rounded hover:text-white hover:bg-red-600'>
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
            )
          })
        }
        {/* <div onClick={() => setOpenAddAddress(true)} className='h-16 bg-blue-50 border-2 border-dashed border-gray-300 flex justify-center items-center cursor-pointer'>
          Add address
        </div> */}
        {
          openAddAddress && (
            <AddAddress close={() => setOpenAddAddress(false)} />
          )
        }
        {
          openEdit && (
            <EditAddressDetails close={() => setOpenEdit(false)} data={editData} />
          )
        }
      </div>
    </div>
  )
}

export default Address
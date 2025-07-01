import React, { useState } from 'react'
import EditProductAdmin from './EditProductAdmin'
import ConfirmBox from './ConfirmBox'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SunmaryApi'
import toast from 'react-hot-toast'

const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleDeteleProduct = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data : {
          _id : data._id
        }
      })

      const { data : responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        if (fetchProductData) {
          fetchProductData()
        }
        setOpenDelete(false)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <div className='w-36 p-4 bg-white rounded'>
      <div>
        <img
          src={data?.image[0]}
          alt={data?.name}
          className='w-full h-full object-scale-down'
        />
        <p className='text-ellipsis line-clamp-2 font-medium'>{data?.name}</p>
        <p className='text-slate-400'>{data?.unit}</p>
        <div className='grid grid-cols-2 gap-3 py-2'>
          <button onClick={() => setOpenEdit(true)} className='border px-1 py-1 text-sm border-green-600 rounded bg-green-100 text-green-800 hover:bg-green-200'>Edit</button>
          <button onClick={() => setOpenDelete(true)} className='border px-1 py-1 text-sm border-red-600 rounded bg-red-100 text-red-800 hover:bg-red-200'>Delete</button>
        </div>
      </div>

      {
        openEdit && <EditProductAdmin data={data} close={() => setOpenEdit(false)} fetchProductData={fetchProductData}/>
      }

      {
        openDelete && (<ConfirmBox close={() => setOpenDelete(false)} cancel={() => setOpenDelete(false)} confirm={handleDeteleProduct} />)
      }

    </div>
  )
}

export default ProductCardAdmin
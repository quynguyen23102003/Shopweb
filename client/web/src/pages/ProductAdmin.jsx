import React, { useEffect, useState } from 'react'
import SunmaryApi from '../common/SunmaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import Loading from '../components/Loading'
import ProductCardAdmin from '../components/ProductCardAdmin'
import { IoSearch } from "react-icons/io5";

const ProductAdmin = () => {
  const [productData, setProductData] = useState([])
  const [isLoading, setIsloading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [search, setSearch] = useState("")

  const fetchProductData = async () => {
    try {
      setIsloading(true)
      const response = await Axios({
        ...SunmaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search: search
        }
      })
      const { data: responseData } = response

      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPage)
        setProductData(responseData.data)
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setIsloading(false)
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [page])

  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage(preve => preve + 1)
    }
  }

  const handlePrevious = () => {
    if (page > 1) {
      setPage(preve => preve - 1)
    }
  }

  const handleOnchange = (e) => {
    const { value } = e.target
    setSearch(value)
    setPage(1)
  }

  useEffect(() => {
    let flag = true

    const interval = setTimeout(() => {
      if (flag) {
        fetchProductData()
        flag = false
      }
    }, 300)

    return () => {
      clearTimeout(interval)
    }
  }, [search])

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between gap-4'>
        <h2 className='font-semibold'>Product</h2>
        <div className='h-full max-w-56 min-w-24 ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 text-neutral-500 border border-gray-300 rounded focus-within:border-[#ffbf00]'>
          <IoSearch size={25} />
          <input
            type="text"
            placeholder='Search product here ...'
            className='h-full w-full bg-transparent outline-none'
            onChange={handleOnchange}
            value={search}
          />
        </div>
      </div>

      {
        isLoading && <Loading />
      }

      <div className='p-4 bg-blue-50'>
        <div className='min-h-[55vh]'>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
            {
              productData.map((p, index) => {
                return (
                  <ProductCardAdmin data={p} key={p._id + "Product"} fetchProductData={fetchProductData} />
                )
              })
            }
          </div>
        </div>
        <div className='flex justify-between my-4'>
          <button onClick={handlePrevious} className='border border-[#ffbf00] px-4 py-1 hover:bg-[#ffbf00]'>Previous</button>
          <button className='w-full bg-slate-100'>{page}/{totalPageCount}</button>
          <button onClick={handleNext} className='border border-[#ffbf00] px-4 py-1 hover:bg-[#ffbf00]'>Next</button>
        </div>
      </div>
    </section>
  )
}

export default ProductAdmin
import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import { useSelector } from 'react-redux';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SunmaryApi';
import toast from 'react-hot-toast';

const UploadSubCategoryModel = ({ close, fetchData }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    image: "",
    category: []
  })
  const allCategory = useSelector(state => state.product.allCategory)
  const [isloading, setIsLoading] = useState(false)
  const handleChange = async (e) => {
    const { name, value } = e.target

    setSubCategoryData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0]

    if (!file) {
      return
    }
    setIsLoading(true)
    const response = await uploadImage(file)
    const { data: ImageResponse } = response
    setIsLoading(false)
    setSubCategoryData((preve) => {
      return {
        ...preve,
        image: ImageResponse.data.url
      }
    })
  }

  const handleRemoveCategorySelected = async (categoryId) => {
    const index = subCategoryData.category.findIndex(el => el._id === categoryId)
    subCategoryData.category.splice(index, 1)
    setSubCategoryData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      const response = await Axios({
        ...SummaryApi.addSubCategory,
        data : subCategoryData
      })

      const { data : responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        if (close) {
          close()
          fetchData()
        }
      }

    } catch (error) {
      AxiosToastError()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-800/60 flex items-center justify-center z-50'>
      <div className='bg-white max-w-4xl w-full p-4 rounded'>
        <div className='flex items-center justify-between'>
          <h1 className='font-semibold'>Add Sub Category</h1>
          <button onClick={close} className='text-neutral-800 w-fit block ml-auto'>
            <IoClose size={25} />
          </button>
        </div>
        <form className='my-3 grid gap-2' onSubmit={handleSubmitSubCategory}>
          <div className='grid gap-1'>
            <label htmlFor='name'>Name</label>
            <input
              id='name'
              name='name'
              value={subCategoryData.name}
              onChange={handleChange}
              className='p-3 bg-blue-50 border-blue-100 border outline-none focus-within:border-[#ffbf00] rounded'
            />
          </div>
          <div className='grid gap-1'>
            <p>Image</p>
            <div className='flex gap-4 flex-col lg:flex-row items-center'>
              <div className='border bg-blue-50 border-blue-100 h-36 w-full lg:w-36 flex items-center justify-center'>
                {
                  !subCategoryData.image ? (
                    <p className='text-sm text-neutral-500'>No Image</p>
                  ) : (
                    <img src={subCategoryData.image} alt='subCategory' className='w-full h-full object-scale-down' />
                  )
                }
              </div>
              <label htmlFor='uploadSubCategoryImage'>
                <div className={`
                ${!subCategoryData.name ? 'bg-gray-300 border-gray-300' : 'border-[#ffbf00] hover:bg-[#ffc929]'}
                px-4 py-2 rounded cursor-pointer border font-medium
                `}>
                  {
                    isloading ? "Loading..." : "Upload Image"
                  }
                </div>
                <input disabled={!subCategoryData.name} onChange={handleUploadSubCategoryImage} type="file" id='uploadSubCategoryImage' className='hidden' />
              </label>
            </div>
          </div>
          <div className='grid gap-1'>
            <label htmlFor="">Select Category</label>
            <div className='border focus-within:border-[#ffbf00] rounded border-gray-300'>
              {/* display value */}
              <div className='flex flex-wrap gap-2'>
                {
                  subCategoryData.category.map((cat, index) => {
                    return (
                      <p key={cat._id + "selectedValue"} className='bg-white shadow-md px-1 m-1 flex items-center gap-1'>
                        {cat.name}
                        <div className='text-neutral-800 cursor-pointer hover:text-red-600' onClick={() => handleRemoveCategorySelected(cat._id)}>
                          <IoClose size={20} />
                        </div>
                      </p>
                    )
                  })
                }
              </div>

              {/* select category */}
              <select
                className='w-full p-2 bg-transparent outline-none border rounded border-gray-300'
                onChange={(e) => {
                  const value = e.target.value
                  const categoryDetails = allCategory.find(el => el._id == value)

                  setSubCategoryData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, categoryDetails]
                    }
                  })
                }}
              >
                <option value={""} disabled selected>Select Category</option>
                {
                  allCategory.map((category, index) => {
                    return (
                      <option value={category?._id} key={category._id + "subCategory"}>
                        {category?.name}
                      </option>
                    )
                  })
                }
              </select>
            </div>
          </div>

          <button className={`
          ${subCategoryData.name && subCategoryData.image && subCategoryData.category[0] ? "bg-[#ffbf00] hover:bg-[#ffc929]" : "bg-gray-300"}
          py-2 font-semibold 
          `}>
            Submit 
          </button>
        </form>
      </div>
    </section>
  )
}

export default UploadSubCategoryModel
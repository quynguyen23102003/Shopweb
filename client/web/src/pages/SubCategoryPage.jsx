import React, { useEffect, useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SunmaryApi'
import NoData from '../components/NoData'
import Loading from '../components/Loading'
import DisplayTable from '../components/DisplayTable'
import { createColumnHelper } from '@tanstack/react-table'
import ViewImage from '../components/ViewImage'
import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import EditSubCategory from '../components/EditSubCategory'
import toast from 'react-hot-toast'
import ConfirmBox from '../components/ConfirmBox'
import { useSelector } from 'react-redux'

const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenSubCategory] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const columnHelper = createColumnHelper()
  const [imageURL, setImageURL] = useState("")
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({
    _id: ""
  })
  const [deleteSubCategory, setDeleteSubCategory] = useState({
    _id: ""
  })
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false)
  const allSubCategory = useSelector(state => state.product.allSubCategory)

  useEffect(() => {
    setData(allSubCategory)
  }, [allSubCategory]) 

  // const fetchSubCategory = async () => {
  //   try {
  //     setLoading(true)
  //     const response = await Axios({
  //       ...SummaryApi.getSubCategory,
  //     })
  //     const { data: responseData } = response

  //     if (responseData.success) {
  //       setData(responseData.data)
  //     }
  //   } catch (error) {
  //     AxiosToastError(error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   fetchSubCategory()
  // }, [])

  const handleDeteleSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteSubCategory
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        // fetchSubCategory()
        setOpenConfirmBoxDelete(false)
        setDeleteSubCategory({ _id: "" })
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  const column = [
    columnHelper.accessor('name', {
      header: "Name"
    }),
    columnHelper.accessor('image', {
      header: "Image",
      cell: ({ row }) => {
        return <div className='flex justify-center items-center'>
          <img
            src={row.original.image}
            alt={row.original.name}
            className='w-8 h-8 cursor-pointer'
            onClick={() => {
              setImageURL(row.original.image)
            }}
          />
        </div>
      }
    }),
    columnHelper.accessor('category', {
      header: "Category",
      cell: ({ row }) => {
        return (
          <>
            {
              row.original.category.map((c, index) => {
                return (
                  <p key={c._id + "table"} className='shadow-md px-1 inline-block'>{c.name}</p>
                )
              })
            }
          </>
        )
      }
    }),
    columnHelper.accessor('_id', {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className='flex justify-center items-center gap-3'>
            <button className='p-2 bg-green-100 rounded-full text-green-500 hover:text-green-600'
              onClick={() => {
                setOpenEdit(true)
                setEditData(row.original)
              }}>
              <HiPencil size={20} />
            </button>
            <button className='p-2 bg-red-100 rounded-full text-red-500 hover:text-red-600'
              onClick={() => {
                setOpenConfirmBoxDelete(true)
                setDeleteSubCategory(row.original)
              }}>
              <MdDelete size={20} />
            </button>
          </div>
        )
      }
    })
  ]

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Sub Category</h2>
        <button onClick={() => setOpenSubCategory(true)} className='text-sm border border-[#ffbf00] hover:bg-[#ffbf00] px-3 py-1 rounded'>Add Sub Category</button>
      </div>
      {
        !data[0] && !loading ? (
          <NoData />
        ) : (
          <div className='overflow-auto w-full max-w-[95vw]'>
            <DisplayTable
              data={data}
              column={column}
            />
          </div>
        )
      }

      {
        loading && (<Loading />)
      }

      {
        // openAddSubCategory && <UploadSubCategoryModel close={() => setOpenSubCategory(false)} fetchData={fetchSubCategory} />
        openAddSubCategory && <UploadSubCategoryModel close={() => setOpenSubCategory(false)} />
      }

      {
        imageURL && <ViewImage url={imageURL} close={() => setImageURL("")} />
      }

      {
        // openEdit && <EditSubCategory data={editData} close={() => setOpenEdit(false)} fetchData={fetchSubCategory} />
        openEdit && <EditSubCategory data={editData} close={() => setOpenEdit(false)}/>
      }

      {
        openConfirmBoxDelete && (<ConfirmBox close={() => setOpenConfirmBoxDelete(false)} cancel={() => setOpenConfirmBoxDelete(false)} confirm={handleDeteleSubCategory} />)
      }
    </section>
  )
}

export default SubCategoryPage
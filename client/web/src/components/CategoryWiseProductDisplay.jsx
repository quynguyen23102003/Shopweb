import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SunmaryApi'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'

const CategoryWiseProductDisplay = ({ id, name }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const containerRef = useRef()
    const loadingCardNumber = new Array(6).fill(null)
    const categoryData = useSelector(state => state.product.allCategory)
    const subCategoryData = useSelector(state => state.product.allSubCategory)

    const fetchCategoryWiseProduct = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProductByCategory,
                data: {
                    id: id
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                setData(responseData.data)
            }

        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategoryWiseProduct()
    }, [])

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200
    }

    const handleScrollLeft = () => {
        containerRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    }

    const handleRedirectProductListpage = () => {
        const subCategory = subCategoryData.find(sub => {
            const filterData = sub.category.some(c => {
                return c._id == id
            })

            return filterData ? true : null
        })

        const url = `/${valideURLConvert(name)}-${id}/${valideURLConvert(subCategory?.name)}-${valideURLConvert(subCategory._id)}`

        return url
    }

    const redirectUrl = handleRedirectProductListpage()

    return (
        <div>
            {
                (!loading && data.length === 0) ? null : (
                    <>
                        <div className='container mx-auto p-4 flex justify-between items-center gap-4'>
                            <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
                            <Link to={redirectUrl} className='text-green-600 hover:text-green-400'>See All</Link>
                        </div>
                        <div className='relative flex items-center'>
                            <div className='flex gap-4 md:gap-6 lg:gap-8 container mx-auto p-4 overflow-x-scroll scrollbar-none scroll-smooth' ref={containerRef}>
                                {
                                    (loading || data.length === 0) ? (
                                        loadingCardNumber.map((_, index) => {
                                            return (
                                                <CardLoading key={"CategoryWiseProductDisplay" + index} />
                                            )
                                        })
                                    ) : (
                                        data.map((p, index) => {
                                            return (
                                                <CardProduct data={p} key={p._id + "CategoryWiseProductDisplay" + index} />
                                            )
                                        })
                                    )
                                }
                            </div>
                            <div className='w-full container left-0 right-0 mx-auto px-2 absolute hidden lg:flex justify-between'>
                                <button className='z-10 relative bg-white shadow-lg rounded-full p-2 text-lg hover:bg-gray-100' onClick={handleScrollLeft}>
                                    <FaAngleLeft />
                                </button>
                                <button className='z-10 relative bg-white shadow-lg rounded-full p-2 text-lg hover:bg-gray-100' onClick={handleScrollRight}>
                                    <FaAngleRight />
                                </button>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default CategoryWiseProductDisplay
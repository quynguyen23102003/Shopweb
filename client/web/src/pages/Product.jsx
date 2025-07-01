import React, { useEffect } from 'react'
import SunmaryApi from '../common/SunmaryApi'
import { useState } from 'react'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'

const Product = () => {
    const [productData, setProductData] = useState([])
    const [isLoading, setIsloading] = useState(false)
    const [page, setPage] = useState(1)

    const fetchProductData = async () => {
        try {
            setIsloading(true)
            const response = await Axios({
                ...SunmaryApi.getProduct,
                data : {
                    page : page,
                }
            })
            const { data : responseData } = response
            console.log(responseData)
            if (responseData.success) {
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
    }, [])
    
    return (
        <div>Product</div>
    )
}

export default Product
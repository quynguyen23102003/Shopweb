import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SunmaryApi'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import { DisplayPriceInVND } from '../utils/DisplayPriceInVND'
import Divider from '../components/Divider'
import image1 from '../assets/minute_delivery.png'
import image2 from '../assets/Best_Prices_Offers.png'
import image3 from '../assets/Wide_Assortment.png'
import { priceWithDiscount } from '../utils/PriceWithDiscount'
import Loading from '../components/Loading'
import AddToCartButton from '../components/AddToCartButton'

const ProductDisplayPage = () => {
  const params = useParams()
  const productId = params?.product?.split("-")?.slice(-1)[0]
  const [data, setData] = useState({
    name: "",
    image: []
  })
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(0)
  const imageContainer = useRef()

  const fetchProductDetails = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId
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
    fetchProductDetails()
  }, [params])

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 50
    
  }

  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 50
  }

  return (
    <>
      {loading ? <Loading /> : (
        <section className='container mx-auto p-4 grid lg:grid-cols-2'>
          <div className=''>
            <div className='bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 w-full h-full'>
              <img
                src={data.image[image]}
                alt='max-product'
                className='w-full h-full object-scale-down'
              />
            </div>
            <div className='flex items-center justify-center gap-3 my-2'>
              {
                data.image.map((img, index) => {
                  return (
                    <div className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${index === image && "bg-slate-300"}`} key={img + index + "point"}></div>
                  )
                })
              }
            </div>
            <div className='grid relative'>
              <div ref={imageContainer} className='flex gap-4 z-10 relative overflow-x-auto scrollbar-none'>
                {
                  data.image.map((img, index) => {
                    return (
                      <div className='w-20 h-20 min-w-20 min-h-20 shadow-md cursor-pointer' key={img + index}>
                        <img
                          src={img}
                          alt='min-product'
                          onClick={() => setImage(index)}
                          className='w-full h-full object-scale-down'
                        />
                      </div>
                    )
                  })
                }
              </div>
              {/* <div className='w-full h-full -ml-3 absolute flex justify-between items-center'>
                <button onClick={handleScrollLeft} className='bg-white p-1 rounded-full shadow-lg relative z-10'>
                  <FaAngleLeft />
                </button>
                <button onClick={handleScrollRight} className='bg-white p-1 rounded-full shadow-lg relative z-10'>
                  <FaAngleRight />
                </button>
              </div> */}
            </div>
            <div>
            </div>
            <div className='my-4 lg:grid gap-3 hidden'>
              <div>
                <p className='font-semibold'>Description</p>
                <div className='text-base'>{data.description}</div>
              </div>
              <div>
                <p className='font-semibold'>Unit</p>
                <div className='text-base'>{data.unit}</div>
              </div>
              {
                data?.more_details && Object.keys(data?.more_details).map((element, index) => {
                  return (
                    <div key={index}>
                      <p className='font-semibold'>{element}</p>
                      <div className='text-base'>{data?.more_details[element]}</div>
                    </div>
                  )
                })
              }
            </div>
          </div>

          <div className='p-4 lg:pl-7 lg:text-lg'>
            <p className='bg-green-300 w-fit px-2 rounded-full'>10 Min</p>
            <h2 className='text-lg font-semibold lg:text-3xl'>{data.name}</h2>
            <p className=''>Unit: {data.unit}</p>
            <Divider />
            <div>
              <p className=''>Price</p>
              <div className='flex items-center gap-2 lg:gap-4'>
                <div className='border border-green-600 p-4 py-2 rounded bg-green-50 w-fit'>
                  <p className='font-semibold text-lg lg:text-xl'>{DisplayPriceInVND(priceWithDiscount(data.price, data.discount))}</p>
                </div>
                {
                  Boolean(data.discount) &&
                  <p className='line-through'>{DisplayPriceInVND(data.price)}</p>
                }
                {
                  Boolean(data.discount) &&
                  <p className='font-bold text-green-600 lg:text-2xl'>{data.discount}% <span className='text-base text-neutral-500'>Discount</span></p>
                }
              </div>
            </div>

            {
              data.stock === 0 ? (
                <p className='text-lg text-red-500 my-2'>Out of Stock</p>
              ) : (
                // <button className='my-4 px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded'>
                //   Add
                // </button>
                <div className='my-4'>
                  <AddToCartButton data={data}/>
                </div>
              )
            }

            <h2 className='font-semibold'>Why shop from binkeyit?</h2>
            <div>
              <div className='flex items-center gap-4 my-4'>
                <img
                  src={image1}
                  alt="Superfast delivery"
                  className='w-20 h-20'
                />
                <div className='text-sm'>
                  <div className='font-semibold'>Superfast Delivery</div>
                  <p>Get your orer delivered to your doorstep at the earliest from dark stores near you.</p>
                </div>
              </div>
              <div className='flex items-center gap-4 my-4'>
                <img
                  src={image2}
                  alt="Best prices offers"
                  className='w-20 h-20'
                />
                <div className='text-sm'>
                  <div className='font-semibold'>Best Prices & Offers</div>
                  <p>Best price destination with offers directly from the nanufacturers.</p>
                </div>
              </div>
              <div className='flex items-center gap-4 my-4'>
                <img
                  src={image3}
                  alt="Wide assortment"
                  className='w-20 h-20'
                />
                <div className='text-sm'>
                  <div className='font-semibold'>Wide Assortment</div>
                  <p>Choose from 5000+ products across food personal care, household & other categories.</p>
                </div>
              </div>
            </div>

            {/**only mobile */}
            <div className='my-4 grid gap-3 lg:hidden'>
              <div>
                <p className='font-semibold'>Description</p>
                <div className='text-base'>{data.description}</div>
              </div>
              <div>
                <p className='font-semibold'>Unit</p>
                <div className='text-base'>{data.unit}</div>
              </div>
              {
                data?.more_details && Object.keys(data?.more_details).map((element, index) => {
                  return (
                    <div key={index}>
                      <p className='font-semibold'>{element}</p>
                      <div className='text-base'>{data?.more_details[element]}</div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default ProductDisplayPage
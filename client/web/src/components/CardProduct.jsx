import React from 'react'
import { DisplayPriceInVND } from '../utils/DisplayPriceInVND'
import { valideURLConvert } from '../utils/valideURLConvert'
import { Link } from 'react-router-dom'
import { priceWithDiscount } from '../utils/PriceWithDiscount'

const CardProduct = ({ data }) => {
    const url = `/product/${valideURLConvert(data.name)}-${data._id}`
    const imageSrc = Array.isArray(data?.image) && data.image.length > 0
        ? data.image[0]
        : "https://via.placeholder.com/150";
    return (
        <Link to={url} className='border py-2 border-gray-300 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded bg-white'>
            <div className='min-h-20 max-h-24 w-full lg:max-h-32 rounded overflow-hidden'>
                <img
                    src={imageSrc}
                    alt={imageSrc || "product"}
                    className='w-full h-full object-scale-down lg:scale-125'
                />
            </div>
            <div className='flex items-center gap-1'>
                <div className='rounded text-xs w-fit px-2 p-[1px] text-green-600 bg-green-50 lg:px-0'>
                    10 min
                </div>
                <div>
                    {
                        Boolean(data.discount) && <p className='text-green-600 bg-green-100 px-2 text-xs rounded w-fit'>{data.discount}% discount</p>
                    }
                </div>
            </div>
            <div className='font-medium text-ellipsis line-clamp-2 lg:text-base text-sm px-2 lg:px-0'>
                {data.name}
            </div>
            <div className='w-fit px-2 text-sm lg:text-base lg:px-0'>
                {data.unit}
            </div>

            <div className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
                <div>
                    <div className='font-semibold'>
                        {DisplayPriceInVND(priceWithDiscount(data.price, data.discount))}
                    </div>
                </div>
                <div className=''>
                    {
                        data.stock == 0 ? (
                            <p className='text-red-500 text-sm text-center'>Out of stock</p>
                        ) : (
                            <button className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded'>
                                Add
                            </button>
                        )
                    }
                </div>
            </div>
        </Link>
    )
}

export default CardProduct
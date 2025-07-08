import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, Links } from 'react-router-dom'
import { useGlobalContext } from '../provider/Globalprovider'
import { DisplayPriceInVND } from '../utils/DisplayPriceInVND'
import { FaCaretRight } from "react-icons/fa6";
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import { priceWithDiscount } from '../utils/PriceWithDiscount'
import imageEmpty from '../assets/empty_cart.webp'

const DisplayCartItem = ({ close }) => {
    const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext()
    const cartItems = useSelector(state => state.cartItem.cart)
    console.log("cartItems", cartItems)
    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-800/60 z-50'>
            <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto'>
                <div className='flex items-center justify-between p-4 shadow-md gap-3'>
                    <h2 className='font-semibold'>Cart</h2>
                    <Link to={"/"} className='lg:hidden'>
                        <IoClose size={25} />
                    </Link>
                    <button onClick={close} className='text-neutral-800 w-fit ml-auto hidden lg:block'>
                        <IoClose size={25} />
                    </button>
                </div>

                <div className='min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4'>
                    {/**display items */}
                    {
                        cartItems[0] ? (
                            <>
                                <div className='flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full'>
                                    <p>Your total savings</p>
                                    <p>{DisplayPriceInVND(notDiscountTotalPrice - totalPrice)}</p>
                                </div>
                                <div className='bg-white rounded-lg p-4 grid gap-5 overflow-auto'>
                                    {
                                        cartItems[0] && (
                                            cartItems.map((item, index) => {
                                                return (
                                                    <div key={index} className='flex w-full gap-4'>
                                                        <div className='w-16 h-16 min-w-16 min-h-16 bg-red-100 border border-gray-300 rounded'>
                                                            <img
                                                                src={item?.productId?.image[0]}
                                                                alt={item?.productId?.image[0]}
                                                                className='object-scale-down'
                                                            />
                                                        </div>
                                                        <div className='w-full max-w-sm text-xs'>
                                                            <p className='text-ellipsis line-clamp-2'>{item?.productId?.name}</p>
                                                            <p className='text-neutral-400'>{item?.productId?.unit}</p>
                                                            <p className='font-semibold'>{DisplayPriceInVND(priceWithDiscount(item?.productId?.price, item?.productId?.discount))}</p>
                                                        </div>
                                                        <div>
                                                            <AddToCartButton data={item?.productId} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                    }
                                </div>
                                <div className='bg-white p-4'>
                                    <h3 className='font-semibold'>Bill details</h3>
                                    <div className='flex gap-4 justify-between ml-1'>
                                        <p>Items total</p>
                                        <p className='flex justify-center gap-2'>
                                            <span className='line-through text-neutral-400'>{DisplayPriceInVND(notDiscountTotalPrice)}</span>
                                            <span>{DisplayPriceInVND(totalPrice)}</span>
                                        </p>
                                    </div>
                                    <div className='flex gap-4 justify-between ml-1'>
                                        <p>Quantity total</p>
                                        <p className='flex justify-center gap-2'>
                                            {totalQty} item
                                        </p>
                                    </div>
                                    <div className='flex gap-4 justify-between ml-1'>
                                        <p>Delivery Charge</p>
                                        <p className='flex justify-center gap-2'>
                                            Free
                                        </p>
                                    </div>
                                    <div className='font-semibold flex items-center justify-between gap-4'>
                                        <p>Grand total</p>
                                        <p>{DisplayPriceInVND(totalPrice)}</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className='bg-white flex flex-col justify-center items-center'>
                                <img
                                    src={imageEmpty}
                                    className='w-full h-full object-scale-down'
                                />
                                <Link onClick={close} className='block bg-green-600 px-4 py-2 rounded text-white' to={"/"}>Shop Now</Link>
                            </div>
                        )
                    }
                </div>

                {
                    cartItems[0] && (
                        <div className='p-2'>
                            <div className='bg-green-700 text-neutral-100 p-4 font-bold text-base static bottom-3 rounded flex items-center justify-between gap-4'>
                                <div>
                                    {DisplayPriceInVND(totalPrice)}
                                </div>
                                <button className='flex items-center gap-1'>
                                    Proceed
                                    <span>
                                        <FaCaretRight />
                                    </span>
                                </button>
                            </div>
                        </div>
                    )
                }

            </div>
        </section>
    )
}

export default DisplayCartItem
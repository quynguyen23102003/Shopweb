import React, { useState } from 'react'
import { DisplayPriceInVND } from '../utils/DisplayPriceInVND'
import { useGlobalContext } from '../provider/Globalprovider'
import AddAddress from '../components/AddAddress'
import { useSelector } from 'react-redux'

const CheckOutPage = () => {
    const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext()
    const [openAddAddress, setOpenAddAddress] = useState(false)
    const addressList = useSelector(state => state.address.addressList)
    const [selectAddress, setSelectAddress] = useState(0)

    return (
        <section className='bg-blue-50'>
            <div className='container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between'>
                <div className='w-full'>
                    {/**address */}
                    <h3 className='text-lg font-semibold'>Choose your address</h3>
                    <div className='bg-white p-2 grid gap-4'>
                        {
                            addressList.map((address, index) => {
                                return (
                                    <label htmlFor={"address"+index} key={index + "Address"} className={!address.status && "hidden"}>
                                        <div className='border rounded border-gray-300 p-3 flex gap-3 hover:bg-blue-50'>
                                            <div>
                                                <input id={"address"+index} type="radio" name='address' value={index} onChange={(e) => setSelectAddress(e.target.value)}/>
                                            </div>
                                            <div>
                                                <p>{address.address_line}</p>
                                                <p>{address.city}</p>
                                                <p>{address.state}</p>
                                                <p>{address.country} - {address.pincode}</p>
                                                <p>{address.mobile}</p>
                                            </div>
                                        </div>
                                    </label>
                                )
                            })
                        }
                        <div onClick={() => setOpenAddAddress(true)} className='h-16 bg-blue-50 border-2 border-dashed border-gray-300 flex justify-center items-center cursor-pointer'>
                            Add address
                        </div>
                    </div>
                </div>
                <div className='w-full max-w-md bg-white py-4 px-2'>
                    {/**summary */}
                    <h3 className='text-lg font-semibold'>Summary</h3>
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
                    <div className='w-full flex flex-col gap-4'>
                        <button className='py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded'>Online Payment</button>
                        <button className='py-2 px-4 border-2 border-green-600 font-semibold text-green-600 hover:bg-green-600 hover:text-white rounded'>Cash on Delivery</button>
                    </div>
                </div>
            </div>

            {
                openAddAddress && (
                    <AddAddress close={() => setOpenAddAddress(false)} />
                )
            }
        </section>
    )
}

export default CheckOutPage
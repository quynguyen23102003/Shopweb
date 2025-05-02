import React from 'react'
import { IoClose } from "react-icons/io5";

const ConfirmBox = ({ cancel, confirm, close }) => {
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-50 bg-neutral-800/60 flex items-center justify-center'>
            <div className='bg-white w-full max-w-sm p-4 rounded'>
                <div className='flex items-center justify-between'>
                    <h1 className='font-semibold'>Permanent Delete</h1>
                    <button onClick={close} className='text-neutral-800 w-fit block ml-auto'>
                        <IoClose size={25} />
                    </button>
                </div>
                <p className='my-4'>Are you sure permanent delete ?</p>
                <div className='w-fit ml-auto gap-3 flex items-center'> 
                    <button onClick={cancel} className='px-4 py-1 border rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white'>Cancel</button>
                    <button onClick={confirm} className='px-4 py-1 border rounded border-green-600 text-green-600 hover:bg-green-600 hover:text-white'>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmBox
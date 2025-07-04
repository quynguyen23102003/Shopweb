import React from 'react'
import { IoClose } from "react-icons/io5";

const ViewImage = React.memo(({ url, close }) => {
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 border rounded bg-neutral-800/60 flex justify-center items-center z-50 p-4'>
            <div className='w-full max-w-md max-h-[80vh] p-4 bg-white'>
                <button onClick={close} className='text-neutral-800 w-fit block ml-auto'>
                    <IoClose size={25} />
                </button>
                <img
                    src={url}
                    alt="full screen"
                    className='w-full h-full object-scale-down'
                />
            </div>
        </div>
    )
})

export default ViewImage
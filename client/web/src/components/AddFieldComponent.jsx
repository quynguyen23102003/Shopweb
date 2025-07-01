import React from 'react'
import { IoClose } from "react-icons/io5";

const AddFieldComponent = React.memo(({ close, value, onChange, submit }) => {
    return (
        <section className='fixed top-0 bottom-0 right-0 left-0 bg-neutral-800/60 z-50 flex justify-center items-center p-4'>
            <div className='bg-white rounded p-4 w-full max-w-md'>
                <div className='flex items-center justify-between gap-3'>
                    <h1 className='font-semibold'>Add Field</h1>
                    <button onClick={close}>
                        <IoClose size={25} />
                    </button>
                </div>
                {/* Commit */}
                <input
                    type="text"
                    className='bg-blue-50 my-3 p-2 border outline-none focus-within:border-[#ffc929] border-gray-300 rounded w-full'
                    placeholder='Enter field name'
                    value={value}
                    onChange={onChange}
                    autoFocus
                />
                <button className='bg-[#ffbf00] hover:bg-[#ffc929] px-4 py-2 rounded mx-auto w-fit block font-semibold'
                    onClick={submit}>
                    Add Field
                </button>
            </div>
        </section>
    )
})

export default AddFieldComponent
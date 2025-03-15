import React from 'react'
import { IoSearch } from "react-icons/io5";

const Search = () => {
    return (
        <div className='w-full  min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200'>
            <button className='flex justify-center items-center h-full p-3 group-focus-within:text-primary-200 '>
            <IoSearch size={22}/>
            <div>Search "milk"</div>
            </button>
        </div>
    )
}

export default Search
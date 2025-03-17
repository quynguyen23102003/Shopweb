import React from 'react'
import logo from '../assets/logo.png';
import Search from './Search';
import { Link, useLocation } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';

const Header = () => {
    const [isMobile] = useMobile()
    const location = useLocation()
    console.log("location", location)
    console.log("userMobile", isMobile)
    return (
        <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 flex flex-col justify-center gap-1 bg-red-500'>
            <div className='container mx-auto flex items-center px-2 justify-between'>
                {/*logo */}
                <Link to={"/"} className='h-full'>
                    <div className='h-full flex justify-center items-center '>
                        <img src={logo} alt="logo" width={170} height={60} className='hidden lg:block'/>
                        <img src={logo} alt="logo" width={120} height={60} className='lg:hidden'/>
                    </div>
                </Link>
                {/*Search */}
                <div className='hidden lg:block'>
                    <Search/>
                </div>
                {/*Login and my cart */}
                <div>
                    <button className='text-neutral-600 lg:hidden'>
                        <FaRegCircleUser size={26}/>
                    </button>
                    <div className='hidden lg:block'>
                    Login and my cart
                    </div>
                </div>
            </div>
            <div className='container mx-auto px-2 lg:hidden'>
                <Search/>  
            </div>
        </header>
    )
}

export default Header
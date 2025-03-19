import React from 'react'
import logo from '../assets/logo.png';
import Search from './Search';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";

const Header = () => {
    const [isMobile] = useMobile()
    const location = useLocation()
    const isSearchPage = location.pathname === '/search'
    const navigate = useNavigate()

    const redirectToLoginPage = () => {
        navigate("/login")
    }
    return (
        <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 flex flex-col justify-center gap-1'>
            {
                !(isMobile && isSearchPage) && (
                    <div className='container mx-auto flex items-center px-2 justify-between'>
                        {/*logo */}
                        <Link to={"/"} className='h-full'>
                            <div className='h-full flex justify-center items-center '>
                                <img src={logo} alt="logo" width={170} height={60} className='hidden lg:block' />
                                <img src={logo} alt="logo" width={120} height={60} className='lg:hidden' />
                            </div>
                        </Link>
                        {/*Search */}
                        <div className='hidden lg:block'>
                            <Search />
                        </div>
                        {/*Login and my cart */}
                        <div className=''>
                            {/** user icons display in only mobile version */}
                            <button className='text-neutral-600 lg:hidden'>
                                <FaRegCircleUser size={26} />
                            </button>
                            {/** Desktop */}
                            <div className='hidden lg:flex items-center gap-10'>
                                <button>Login</button>
                                <button className='flex items-center gap-2 bg-green-800 hover:bg-green-700 p-3 rounded text-white'>
                                    {/** Add to card icons */}
                                    <div className='animate-bounce'>
                                        <BsCart4 size={26}/>
                                    </div>
                                    <div className='font-semibold'>
                                        <p>My Cart</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className='container mx-auto px-2 lg:hidden'>
                <Search />
            </div>
        </header>
    )
}

export default Header
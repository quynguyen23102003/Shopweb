import React from 'react'
import logo from '../assets/logo.png';
import Search from './Search';

const Header = () => {
    return (
        <header className='h-20 shadow-md sticky top-0'>
            <div className='container mx-auto flex items-center h-full px-2 justify-between'>
                {/*logo */}
                <div className='h-full'>
                    <div className='h-full flex justify-center items-center '>
                        <img src={logo} alt="logo" width={170} height={60} className='hidden lg:block'/>
                        <img src={logo} alt="logo" width={120} height={60} className='lg:hidden'/>
                    </div>
                </div>
                {/*Search */}
                <div>
                    <Search/>
                </div>
                {/*Login and my cart */}
                <div>
                    Login and my cart
                </div>
            </div>
        </header>
    )
}

export default Header
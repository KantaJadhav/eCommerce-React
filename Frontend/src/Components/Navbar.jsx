import React, { useState } from 'react'
import { Menu, X } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import SidebarCart from './SidebarCart';
import { useCountContext } from '../hooks/UseCountContext';


const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cartItems } = useCountContext();

    // Check if the current route is '/dashboard'
    const isDashboard = location.pathname === "/";


    return (
        <div className={`h-[100px] ${isDashboard ? "bg-[#FBEBB5]" : "bg-white"} flex items-center `}>

            <div className='flex-1 flex justify-center h-[24px] md:ml-16'>
                <div className='flex gap-4 md:gap-[50px] text-center'>
                    <div className='font-semibold text-base' ><Link to="/" className="no-underline text-black"> Home </Link></div>
                    <div className='font-semibold text-base'><Link to="/shop" className="no-underline text-black">Shop </Link></div>
                    <div className='font-semibold text-base'><Link to="/" className="no-underline text-black">About </Link></div>
                    <div className='font-semibold text-base'><Link to="/" className="no-underline text-black">Contact</Link></div>
                </div>
            </div>



            <div className='hidden md:flex flex-row h-[28px] gap-[40px] mr-[100px] '>
                <div className='h-[28px]'>
                    <img src='./src/assets/mdi_account-alert-outline.svg' alt='account-icon' />
                </div>
                <div className='h-[28px]'>
                    <img src='./src/assets/akar-icons_heart.svg' alt='account-icon' />
                </div>
                <div className='h-[28px]'>
                    <img src='./src/assets/akar-icons_search.svg' alt='account-icon' />
                </div>
                <div className='h-[28px] cursor-pointer relative' onClick={() => setIsCartOpen(true)}>
                    <img src='./src/assets/ant-design_shopping-cart-outlined.svg' alt='cart-icon' />
                    
                    {cartItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                            {cartItems.length}
                        </span>
                    )}
                </div>
            </div>

            <div className='block md:hidden ml-auto relative top-1'>
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={30} /> : <Menu size={30} />}
                </button>
            </div>

            {isOpen && (
                <div className='absolute w-full top-20 left-0  bg-[#FBEBB5] p-5 shadow-lg flex flex-col items-center gap-4 md:hidden'>
                    <div><img src='./src/assets/mdi_account-alert-outline.svg' alt='account-icon' /></div>
                    <div><img src='./src/assets/akar-icons_heart.svg' alt='account-icon' /></div>
                    <div> <img src='./src/assets/akar-icons_search.svg' alt='account-icon' /></div>
                    <div className='cursor-pointer' onClick={() => setIsCartOpen(true)}>
                        <img src='./src/assets/ant-design_shopping-cart-outlined.svg' alt='cart-icon' />
                    </div>
                </div>
            )}

            {/* {isCartOpen && <SidebarCart onClose={() => setIsCartOpen(false)} />} */}

            {isCartOpen && <SidebarCart cart={cartItems} onClose={() => setIsCartOpen(false)} />}

        </div>

    )
}

export default Navbar
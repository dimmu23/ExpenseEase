import React from "react";
import { useState } from "react";
import {HiOutlineMenu, HiOutlineX} from "react-icons/hi";
import SideMenu from "./SideMenu";


const Navbar = ({activeMenu})=>{
    const [openSideMenu , setOpenSideMenu] = useState(false);

    return (
       <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
        <button 
        className="block lg:hidden text-black"
        onClick={()=>{
            setOpenSideMenu(!openSideMenu);
        }}
        >
         {openSideMenu?(
            <HiOutlineX className="text-2xl" />
         ):(
            <HiOutlineMenu className="text-2xl"/>
         )}
         </button>

         <a href="/dashboard" className="cursor-pointer">
            <div className="flex justify-center items-center gap-2">
               <img src="/icon.png" className="h-10 w-10"></img>
               <h2 className="text-xl font-medium text-purple-800 text-shadow-md">
                  Expense Ease
               </h2>   
            </div>
         </a>

         {
             openSideMenu && (
                <div className="fixed top-[61px] -ml-4 bg-white ">
                  <SideMenu activeMenu={activeMenu} />  
                  </div>
             )
         }
       </div>
    )
}

export default Navbar;
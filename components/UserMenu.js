import React from 'react'
import { AiFillCaretRight, AiOutlineUser, AiFillInfoCircle, AiOutlineHeart, AiOutlineCopy, AiOutlineSetting, AiOutlineLogout, AiOutlineHome, AiFillHome } from 'react-icons/ai'
import { BsFillBookmarkDashFill, BsNewspaper } from 'react-icons/bs'
import { MdOutlineDarkMode } from 'react-icons/md'
import UserIcons from './UserMenuIcon'

function UserMenu() {
    return (
        <><div className='flex flex-col justify-between relative h-full    items-center '>
            <div className='w-full'>
                <UserIcons text="Home" icon={<AiFillHome size={26} className=' p-0.5 w-5 h-5 ' />} />
                <UserIcons text="Profile" icon={<AiOutlineCopy size={26} className=' p-0.5 w-5 h-5 ' />} />
                <UserIcons text="Favourites" icon={<AiOutlineHeart size={26} className=' p-0.5 w-5 h-5 ' />} />
                <UserIcons text="Bookmarks" icon={<BsFillBookmarkDashFill size={26} className=' p-0.5 w-5 h-5 ' />} />
                <UserIcons text="Announcments" icon={<BsNewspaper size={26} className=' p-0.5 w-5 h-5 ' />} />
                <UserIcons text="Settings" icon={<AiOutlineSetting size={26} className=' p-0.5 w-5 h-5 ' />} />
            </div>

            <div className='bg-tonedblack w-full  absolute bottom-0 flex justify-between items-center border-t  border-darkgray'>
                <div className='p-4 border-r border-darkgray group hover:bg-darkgray cursor-pointer  duration-300 transition-all ease-linear'>
                    <AiFillInfoCircle size={20} className='group-hover:text-violet-400 duration-300 transition-all ease-linear' />
                </div>

                <div className='p-4 border-l border-darkgray group hover:bg-darkgray cursor-pointer  duration-300 transition-all ease-linear'>

                    <MdOutlineDarkMode size={20} className='group-hover:text-yellow-400 duration-300 transition-all ease-linear' />

                </div>

            </div>




        </div></>
    )
}

export default UserMenu
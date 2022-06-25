import React from 'react'
import { AiFillCaretRight, AiOutlineUser, AiFillInfoCircle, AiOutlineHeart, AiOutlineCopy, AiOutlineSetting, AiOutlineLogout, AiOutlineHome, AiFillHome } from 'react-icons/ai'
import { BsFillBookmarkDashFill, BsNewspaper } from 'react-icons/bs'
import { MdOutlineDarkMode } from 'react-icons/md'
import UserIcons from './UserMenuIcon'

function UserMenu() {
    return (
        <><div className='flex flex-col justify-between  h-full    items-center  sticky top-0'>
            <div className='w-full  md:sticky left-0 '>
                <UserIcons text="Home" url={'/'} icon={<AiFillHome size={26} className=' p-0.5 w-5 h-5 ' />} />
                <UserIcons text="Profile" url={'/profile'} icon={<AiOutlineCopy size={26} className=' p-0.5 w-5 h-5 ' />} />
                <UserIcons text="Favourites" url={'/link'} icon={<AiOutlineHeart size={26} className=' p-0.5 w-5 h-5 ' />} />
                <UserIcons text="Bookmarks" url={'/bookmarks'} icon={<BsFillBookmarkDashFill size={26} className=' p-0.5 w-5 h-5 ' />} />
                <UserIcons text="Announcments" url={'/link'} icon={<BsNewspaper size={26} className=' p-0.5 w-5 h-5 ' />} />
                <UserIcons text="Settings" url={'/account'} icon={<AiOutlineSetting size={26} className=' p-0.5 w-5 h-5 ' />} />
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
import React from 'react'

function UserIcons({ text, icon }) {
    return (
        <div className='flex items-center gap-0 w-full p-2 border-b border-bordergray group hover:bg-black/60 cursor-pointer duration-300 transition-all ease-out'>
            <div className='p-4 ml-4'>
                <div className='bg-tonedblack rounded-full p-2 group-hover:text-purple-400 cursor-pointer duration-300 transition-all ease-out'>
                    {icon}
                </div>
            </div>
            <div className='p-0  w-full'>
                <a href='#' className='text-white font-semibold'>{text}</a>
            </div>
        </div>
    )
}

export default UserIcons
import React from 'react'
import Link from 'next/link'

function UserIcons({ text, icon, url }) {

    return (
        <Link href={url} className='text-white font-semibold '>
            <div className='flex items-center gap-0 w-full p-2 border-b border-bordergray group hover:bg-black/60 cursor-pointer duration-300 transition-all ease-out'>
                <div className='p-4 ml-4'>
                    <div className='bg-tonedblack rounded-full p-2 group-hover:text-purple-400 cursor-pointer duration-300 transition-all ease-out'>
                        {icon}
                    </div>
                </div>
                <div className='p-0  w-full'>
                    <Link href={url} className='text-white font-semibold'>{text}</Link>
                </div>
            </div>
        </Link>
    )
}

export default UserIcons
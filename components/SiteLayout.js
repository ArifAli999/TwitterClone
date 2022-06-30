import React from 'react'
import Header from './Header'
import { useSession } from '../context'
import { useEffect, useState } from 'react'
import { supabase } from '../util/supabaseClient'
import UserMenu from './UserMenu'
import TrendingComp from './Trending'
import TrendingPost from './TrendingPost'
import { useUser } from '../context/user'



function SiteLayout({ children }) {
    const { session } = useSession();






    return (
        <div className=' w-full'>
            <Header />

            <div className='flex md:flex-row flex-col w-full min-h-screen gap-0 p-0'>

                {session ? (
                    <div className='text-white  border-b border-t md:border-r md:border-t-0 md:border-b-0 border-bordergray   w-full md:w-2/6 md:sticky top-0 z-30 overflow-hidden  '>
                        <div className='h-full  w-full  sticky top-0'>
                            <UserMenu />
                        </div>
                    </div>
                ) : ''}




                <div className=' p-0  md:w-min-3/12 w-full h-screen md:overflow-scroll scroll-smooth scrollbar-hide'> {children}</div>








            </div>


        </div>
    )
}

export default SiteLayout
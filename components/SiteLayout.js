import React from 'react'
import Header from './Header'
import { useSession } from '../context'
import { useEffect, useState } from 'react'
import { supabase } from '../util/supabaseClient'
import UserMenu from './UserMenu'
import TrendingComp from './Trending'
import TrendingPost from './TrendingPost'


function SiteLayout({ children }) {
    const { session } = useSession();


    const [userInfo, setUserInfo] = useState(null)
    console.log(userInfo)

    useEffect(() => {
        if (session) {
            getCurrentUser()
        }

        if (!session) {
            setUserInfo(null);
        }

    }, [session])

    async function getCurrentUser() {
        try {
            let x = '';

            const { data, error } = await supabase
                .from('profiles')
                .select()
                .eq('id', `${session.user.id}`)


            setUserInfo(data)
            if (error) {
                throw error
            }
        } catch (error) {
            alert(error.message)
        } finally {

        }
    }



    console.log(session)
    return (
        <div className=''>
            <Header session={session} userInfo={userInfo} setUserInfo={setUserInfo} />

            <div className='flex md:flex-row flex-col w-full min-h-screen gap-0 p-0'>

                <div className='text-white  border-b border-t md:border-r md:border-t-0 md:border-b-0 border-bordergray   w-full md:w-2/6 sticky top-0 z-30 overflow-hidden  '>
                    <div className='h-full  w-full overflow-hidden sticky top-0'>
                        <UserMenu />
                    </div>
                </div>


                <div className=' p-0  md:w-min-3/12 w-full h-screen overflow-scroll scroll-smooth'> {children}</div>



                <div className='text-white  border-b border-t md:border-l md:border-t-0 border-bordergray  w-2/5 sticky -z-50'>

                    <div className='p-4'>
                        <TrendingComp />

                        <TrendingPost />
                    </div>

                </div>




            </div>


        </div>
    )
}

export default SiteLayout
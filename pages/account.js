import React from 'react'
import { supabase } from '../util/supabaseClient'
import { useSession } from '../context'
import GeneralInfo from '../components/useraccount/GeneralInfo'
import Auth from '../components/Auth'
import { useUser } from '../context//user'
import Avatar from '../components/useraccount/Avatar'
import Account from '../components/Account'

function UserAccountPage() {
    const { session } = useSession()

    const { user } = useUser()


    return (
        <>
            {!session ? <Auth /> :
                (<div className='p-4'>
                    <h2 className='text-white text-2xl font-thin mb-4 mt-4 ml-4'>Account Settings</h2>
                    <div className='flex flex-col justify-between'>
                        <GeneralInfo />




                    </div>

                </div>)}

        </>






    )
}

export default UserAccountPage
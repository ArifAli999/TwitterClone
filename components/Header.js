import React from 'react'
import LoginComp from './LoginComp'
import UserPopOver from './UserPopOver'
import { useSession } from '../context'
import { useUser } from '../context/user';


function Header({ }) {
    const { session } = useSession()
    const { user } = useUser()

    const x = user && user.map((p) => (p.username)).toString()
    return (
        <div className='bg-black flex justify-between items-center border-b border-bordergray text-white shadow-md shadow-black/70'>

            {!session ? (
                <div className=' w-full flex flex-row items-center  justify-between gap- '>

                    <div className=' p-4  text-right'>
                        Logo
                    </div>

                    <div className=' p-4  text-right'>
                        <LoginComp />
                    </div>
                </div>


            ) : (
                <div className=' w-full flex flex-row items-center  justify-between gap- '>

                    <div className='mr-4 p-4  flex leading-tight'>
                        Welcome back {x},
                    </div>



                    <div className=' p-4 w-full md:w-1/2 text-white'>

                        <UserPopOver />
                    </div>

                </div>
            )}





        </div>
    )
}

export default Header
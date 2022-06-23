import React from 'react'
import LoginComp from './LoginComp'
import UserPopOver from './UserPopOver'


function Header({ session, userInfo, setUserInfo }) {
    return (
        <div className='bg-black/80 flex justify-between items-center  text-white drop-shadow-md border-b border-bordergray shadow-md shadow-black/40'>

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

                    <div className='mr-4 p-4  flex leading-loose'>
                        Welcome back {userInfo && userInfo.map((p)=> (<p key={p.id} className='ml-2'>{p.username}</p>))},
                    </div>



                    <div className=' p-4 w-full md:w-1/2 text-white'>
                      
                        <UserPopOver userInfo={userInfo} setUserInfo={setUserInfo}/>
                    </div>

                </div>
            )}





        </div>
    )
}

export default Header
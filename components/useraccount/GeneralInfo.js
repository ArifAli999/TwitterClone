import React from 'react'
import UserBio from './UserBio'
import UserLocation from './UserLocation'
import UserName from './UserName'
import UserPic from './UserPic'
import DeleteProfile from './DeleteProfile'
import ClearTweets from './ClearTweets'

function GeneralInfo() {
    return (
        <><div className='m-4  bg-black/70 border border-b-0 border-bordergray/70 rounded-sm flex flex-col '>
            <div className='p-4 border-b border-bordergray'>
                <h2 className='text-md font-medium text-white'>General </h2>
            </div>

            <UserName />
            <UserBio />
            <UserPic />
            <UserLocation />



        </div>
            <div className='m-4  bg-black/70 border border-b-0 border-bordergray/70 rounded-sm flex flex-col '>
                <div className='p-4 border-b border-bordergray'>
                    <h2 className='text-md font-medium text-white'>Advanced </h2>
                </div>
                <ClearTweets />
                <DeleteProfile />
            </div>
        </>
    )
}

export default GeneralInfo
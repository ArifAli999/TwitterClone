import React from 'react'

function DeleteProfile() {
    return (
        <div className='p-4  flex w-full justify-between items-center border border-red-600'>
            <div className=''>
                <p className='text-bold text-md text-white'>Delete Profile</p>
                <span className='font-thin text-gray-300 text-sm '>Delete your profile and data from our system</span>
            </div>

            <div className=''>
                <button className='text-bold text-xs text-white border bg-lightblack/80 border-red-600 p-2 rounded'>DELETE</button>
            </div>

        </div>
    )
}

export default DeleteProfile
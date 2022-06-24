import React from 'react'

function UserLocation() {
    return (
        <div className='p-4 mt-2  flex w-full  justify-between items-center border-b border-bordergray'>
            <div className=''>
                <p className='text-bold text-md text-white'>Add Location</p>
                <span className='font-thin text-gray-300/70 text-sm '>Add location to enable location curated tweets.</span>
            </div>

            <div className=''>
                <button className='text-bold text-xs text-white border border-bordergray p-2 rounded'>SELECT</button>
            </div>

        </div>
    )
}

export default UserLocation
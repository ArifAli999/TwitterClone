import React from 'react'

function UserName() {
    return (
        <div className='p-4 mt-2  flex w-full  justify-between items-center border-b border-bordergray'>
            <div className=''>
                <p className='text-bold text-md text-white'>Update username</p>
                <span className='font-thin text-gray-300/70 text-sm '>Change or edit your username</span>
            </div>

            <div className=''>
                <button className='text-bold text-xs text-white border border-bordergray p-2 rounded'>SELECT</button>
            </div>

        </div>
    )
}

export default UserName
import React from 'react'

function ClearTweets() {
    return (
        <div className='p-4  flex w-full justify-between items-center'>
            <div className=''>
                <p className='text-bold text-md text-white'>Delete your data</p>
                <span className='font-thin text-gray-300 text-sm '>Clear all your likes, posts and followers.</span>
            </div>

            <div className=''>
                <button className='text-bold text-xs text-white border bg-lightblack/80 border-bordergray p-2 rounded'>SELECT</button>
            </div>

        </div>
    )
}

export default ClearTweets
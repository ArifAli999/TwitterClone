import React from 'react'

function TrendingPost() {
    return (
        <div className='  w-full h-full mt-4 '>

            <div className='flex flex-col  mx-auto h-full  w-11/12 '>

                <div className='bg-darkgray/60 border border-darkgray rounded  '>
                    <h2 className='text-white/90  font-light text-lg p-4'>Trending Posts </h2>
                    <div className=' gap-2 flex flex-col w-full h-full flex-wrap mt-0.5'>

                        <div className='group p-4 flex items-center gap-3 border-b border-bordergray cursor-pointer hover:opacity-50 '>
                            <div className='w-8 h-8 rounded-full p-2 bg-lightgray border border-purple-300 '>

                            </div>

                            <div className='text-white font-light break-words text-sm '>Hey there this is a test tweet</div>
                        </div>


                        <div className='group p-4 flex items-center gap-3 border-b border-bordergray'>
                            <div className='w-8 h-8 rounded-full p-2 bg-lightgray border border-purple-300 '>

                            </div>

                            <div className='text-white font-light break-words text-sm'>Hey there this is a test tweet</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TrendingPost
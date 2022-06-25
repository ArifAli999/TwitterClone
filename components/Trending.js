import React from 'react'

function TrendingComp() {
    return (
        <div className='  w-full h-full mt-4  overflow-hidden sticky top-0 z-30'>

            <div className='flex flex-col  mx-auto h-full  w-11/12 '>

                <div className='bg-darkgray/60 border border-darkgray rounded  '>
                    <h2 className='text-white/90  font-light text-lg p-4'>Your Collections </h2>
                    <div className='p-4 gap-3.5 gap-y-6 flex  flex-wrap mt-2.5'>
                        <div className='group'>
                            <div className='w-16 h-16 rounded-full p-2 bg-lightgray border border-purple-300 '>

                            </div>
                        </div>


                        <div className=''>
                            <div className='w-16 h-16 rounded-full p-2 bg-lightgray border border-purple-300'></div>
                        </div>
                        <div className=''>
                            <div className='w-16 h-16 rounded-full p-2 bg-lightgray border border-purple-300'></div>
                        </div>
                        <div className=''>
                            <div className='w-16 h-16 rounded-full p-2 bg-lightgray border border-lightblack'></div>
                        </div>
                        <div className=''>
                            <div className='w-16 h-16 rounded-full p-2 bg-lightgray border border-lightblack'></div>
                        </div>
                        <div className=''>
                            <div className='w-16 h-16 rounded-full p-2 bg-lightgray border border-purple-300'></div>
                        </div>
                        <div className=''>
                            <div className='w-16 h-16 rounded-full p-2  bg-lightgray border border-lightblack  text-center flex items-center justify-center'>
                                <span className='text-2xl text-purple-500 font-black'>  + </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TrendingComp
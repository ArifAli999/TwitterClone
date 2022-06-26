import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { BsThreeDots } from 'react-icons/bs'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import { IoIosShareAlt } from 'react-icons/io'
import DropDown from './DropDown'
import { useState, useEffect } from 'react'
import { supabase } from '../util/supabaseClient'
import { useSession } from '../context'
import SmallDropDown from './SmallDropDown'


function BookmarksComp({ bookmarks, setBookmarks, BookmarkedTweets }) {
    const { session } = useSession()

    return (
        <>
            {bookmarks && bookmarks.map((tm) => (
                <div className='bg-black border  w-full flex flex-row border-bordergray text-white mb-10' key={tm.tweetid}>
                    <div className='flex flex-col  w-full'>


                        <div className='flex p-4 items-center justify-between  gap-4 border-b border-bordergray w-full'>
                            <div className='flex gap-4 items-center p-1.5'>
                                <FaUserCircle size={50} className='text-mediumgray' />
                                <div className='text-xl cursor-pointer mb-1 hover:text-purple-400 transition-all duration-300 ease-linear font-semibold text-stone-100 '>
                                    <p className='leading-loose'>{tm.tweets.username}</p><p className='text-xs font-thin text-gray-300/70 leading-tight'>{tm.tweets.createdAt}</p>
                                </div>
                            </div>

                            {session.user.id == tm.userid ? <DropDown tweetid={tm.tweetid} setBookmarks={setBookmarks} bookmarks={bookmarks}
                                BookmarkedTweets={BookmarkedTweets} /> : < SmallDropDown />}



                        </div>

                        <div className='p-6 mt-2'>
                            <p className='text-white/85  font-medium'>
                                {tm.tweets.content}
                            </p>

                        </div>

                        <div className='mt-4 border-t p-4 border-bordergray flex gap-4 relative'>
                            <div className='text-red-400 cursor-pointer hover:text-red-500 transition-all duration-300 ease-in-out flex items-center gap-3'>
                                <AiFillHeart size={20} /> <span className='text-xs text-white'>4</span>
                            </div>

                            <div className='text-blue-200 cursor-pointer hover:text-blue-300 transition-all duration-300 ease-in-out flex items-center gap-3'>
                                <BiComment size={20} /><span className='text-xs text-white'>1</span>
                            </div>


                            <IoIosShareAlt size={20} className='absolute right-4 cursor-pointer hover:text-violet-600 transition-all duration-300 ease-in-out' />


                        </div>



                    </div>
                </div>
            ))}
        </>

    )
}

export default BookmarksComp
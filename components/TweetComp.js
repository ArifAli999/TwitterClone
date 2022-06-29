import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { BsThreeDots } from 'react-icons/bs'
import { AiOutlineHeart, AiFillHeart, AiOutlineSend } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import { IoIosShareAlt } from 'react-icons/io'
import DropDown from './DropDown'
import { useState, useEffect } from 'react'
import { supabase } from '../util/supabaseClient'
import { useSession } from '../context'
import SmallDropDown from './SmallDropDown'
import Link from 'next/link'
import { format, formatDistanceToNow } from 'date-fns'
import { formatISO } from 'date-fns'



function TweetComp({ tweets, setTweets, getTweets, currUser, getAllTweets }) {

    const { session } = useSession()
    const [commentBox, setCommentBox] = useState(null);
    const [cmmt, setCmmt] = useState('')



    async function addCommment(tweetid) {

        if (cmmt.trim().length > 0) {

            try {

                const x = session.user.id
                const username = currUser && currUser.map((p) => (p.username)).toString()


                const { data, error } = await supabase
                    .from('Comments')
                    .insert([
                        {
                            tweetid: tweetid, userid: x,
                            content: cmmt, created_at: formatISO(new Date()), username: username
                        }
                    ])



                setCmmt('')
                if (error) {
                    throw error
                }
            } catch (error) {
                alert(error.message)
            } finally {
                getTweets();

                alert('added')
            }

        }

        else {
            alert('please enter a tweet')
        }


    }









    return (
        <>
            {tweets && tweets.map((tm) => (
                <div key={tm.tweetid}>
                    <div className='bg-black border  w-full  border-bordergray text-white ' key={tm.tweetid}>
                        <div className='flex flex-col  w-full'>

                            <div className='flex p-4 items-center justify-between  gap-4 border-b border-bordergray w-full'>
                                <div className='flex gap-4 items-center p-1.5'>
                                    <FaUserCircle size={50} className='text-mediumgray' />
                                    <div className='text-xl cursor-pointer mb-1 hover:text-purple-400 transition-all duration-300 ease-linear font-semibold text-stone-100 '>
                                        <Link href={`/profiles/${tm.userid}`}>
                                            <p className='leading-loose'>{tm.username}</p>
                                        </Link>

                                        <p className='text-xs font-thin text-gray-300/70 leading-tight'>
                                            {formatDistanceToNow(new Date(tm.createdAt), { addSuffix: true })}
                                        </p>
                                    </div>
                                </div>

                                {session && session.user.id == tm.userid ? <DropDown tweetid={tm.tweetid} getTweets={getAllTweets} /> : < SmallDropDown tweetid={tm.tweetid} />}



                            </div>

                            <div className='p-6 mt-2'>
                                <p className='text-white/85  font-medium'>
                                    {tm.content}


                                </p>

                            </div>

                            <div className='mt-4 border-t p-4 border-bordergray flex gap-4 relative'>
                                <div className='text-red-400 cursor-pointer hover:text-red-500 transition-all duration-300 ease-in-out flex items-center gap-3'>
                                    <AiFillHeart size={20} /> <span className='text-xs text-white'>4</span>
                                </div>





                                <div className='text-blue-200 cursor-pointer hover:text-blue-300 transition-all duration-300 ease-in-out flex items-center gap-3'
                                    onClick={() => {

                                        setCmmt(true)
                                    }} key={tm.tweetid}>


                                    <BiComment size={20} /><span className='text-xs text-white'>{tm.Comments.length}</span>
                                </div>




                            </div>
                            <h2 className='text-white/85  font-medium w-full bg-lightblack p-4  border-t border-b border-bordergray'>Replies </h2>
                            <div className='p-4'>

                                {tm.Comments && tm.Comments.map((cm) => (
                                    <div className=' bg-black/80 border border-bordergray flex-col items-center relative mb-4 rounded' key={cm.commentid}>
                                        <div className='absolute right-4 top-4'>

                                            {session && session.user.id == cm.userid ? <DropDown tweetid={tm.tweetid} getAllTweets={getAllTweets} /> : < SmallDropDown tweetid={tm.tweetid} />}
                                        </div>

                                        <div className='border-b p-4 border-bordergray flex items-center gap-2 mb-0 bg-lightblack/80'>
                                            <FaUserCircle size={50} className='text-mediumgray' />
                                            <p className='text-md'>{cm.username}<br />
                                                <span className='text-xs text-gray-300/70 leading-tight'>
                                                    {formatDistanceToNow(new Date(cm.created_at), { addSuffix: true })}</span></p>

                                        </div>
                                        <div className='ml-2 p-6'>
                                            {cm.content}
                                        </div>
                                    </div>
                                ))}



                            </div>






                        </div>

                    </div>

                    <div className='mt-4 border border-bordergray flex flex-col justify-between w-full  '>
                        <div className='flex justify-between items-center w-full bg-lightblack/90 border-bordergray border-b p-1.5'>

                            <h2 className='text-gray-300  p-4 font-medium '>Reply </h2>

                            <span className=' mr-4 bg-purple-500 rounded-full text-center p-1.5 group hover:bg-purple-100 transition-all duration-300 ease-in-out cursor-pointer'
                                onClick={() => addCommment(tm.tweetid)}>
                                <AiOutlineSend size={20} className=" text-xl text-center flex items-center justify-center  p-0.5 text-white group-hover:text-purple-800 transition-all duration-300 ease-in-out" />
                            </span>
                        </div>
                        <div className='-mb-2 relative '>
                            <textarea className='p-6 w-full h-fit text-white  border-b border-violet-400 bg-black
                                    focus:ring-0 focus:border-b focus:border-violet-600 focus:outline-none transition-colors duration-300 ease-in-out' placeholder='Add a comment'
                                value={cmmt} onChange={(e) => setCmmt(e.target.value)}></textarea>
                        </div>
                    </div>

                </div>

            ))}

        </>

    )
}

export default TweetComp
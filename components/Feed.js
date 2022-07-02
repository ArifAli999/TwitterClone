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
import Link from 'next/link'
import { format, formatDistanceToNow, set } from 'date-fns'
import { useUser } from '../context/user'




function UserFeed({ tweets, setTweets, getAllTweets }) {


    const { session } = useSession()
    const { user } = useUser()

    const [commentBox, setCommentBox] = useState(null);
    const [cmmt, setCmmt] = useState(false)




















    return (
        <>
            {tweets && tweets.map((tm) => (
                <div className='bg-black border  w-full flex border-bordergray text-white mb-10' key={tm.tweetid}>
                    <div className='flex flex-col  w-full'>

                        <div className='flex p-4 items-center justify-between  gap-4 border-b border-bordergray w-full'>
                            <div className='flex gap-4 items-center p-1.5'>




                                {tm.profiles && tm.profiles.avatar_url ? <UserPic imgUrl={tm.profiles.avatar_url} /> : <FaUserCircle size={50} className='text-mediumgray' />}

                                <div className='text-xl cursor-pointer mb-1 hover:text-purple-400 transition-all duration-300 ease-linear font-semibold text-stone-100 '>
                                    <Link href={`/profiles/${tm.userid}`}>
                                        <p className='leading-loose'>{tm.username}</p>
                                    </Link>

                                    <p className='text-xs font-thin text-gray-300/70 leading-tight'>
                                        {formatDistanceToNow(new Date(tm.createdAt), { addSuffix: true })}
                                    </p>
                                </div>
                            </div>

                            {session && session.user.id == tm.userid ? <DropDown tweetid={tm.tweetid} getAllTweets={getAllTweets} /> : < SmallDropDown tweetid={tm.tweetid} />}



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


                            <div className='text-blue-200 cursor-pointer hover:text-blue-300 transition-all duration-300 ease-in-out  gap-3'
                                key={tm.tweetid}>
                                <Link href={`/tweets/${tm.tweetid}`} >
                                    <a className='flex gap-3 items-center'>
                                        <BiComment size={20} />
                                        <span className='text-xs text-white'>{tm.Comments && tm.Comments.length}</span>
                                    </a>
                                </Link>
                            </div>

                            <Link href={`/tweets/${tm.tweetid}`} >
                                <a>   <IoIosShareAlt size={20} className='absolute right-4 cursor-pointer hover:text-violet-600 transition-all duration-300 ease-in-out' />
                                </a>
                            </Link>


                        </div>

                        {cmmt ? (<div className=''>
                            {commentBox && commentBox.filter((cm) => cm.tweetid == tm.tweetid).map((cm) => (
                                <div className='p-4 bg-tonedblack border-t border-bordergray flex-col items-center '>
                                    <div className='flex items-center gap-2 mb-4'>
                                        <FaUserCircle size={40} className='text-mediumgray' />

                                        <p className='text-md'>{cm.username}</p>
                                    </div>
                                    <div className=''>
                                        {cm.content}
                                    </div>
                                </div>
                            ))}
                        </div>) : null}



                    </div>
                </div>
            ))}
        </>

    )
}

const UserPic = ({ imgUrl }) => {
    const [data, setData] = useState();
    console.log(data)
    //use effect to fetch on mount

    async function getImages(url) {

        try {
            const { data, error } = await supabase.storage.from('avatars').createSignedUrl(url, 60000000)
            if (error) {
                throw error
            }
            if (data) {
                setData(data.signedURL)
            }

        } catch (error) {
            console.log('Error downloading image: ', error.message)
        }
        finally {

        }



    }
    useEffect(() => {

        getImages(imgUrl)

    }, [])

    if (data === undefined) return <p>nooo</p> //you can return some loader here


    return (
        <div className='w-14 h-14'>
            <img src={data} className=" object-cover align-middle max-w-full h-full rounded-full border border-bordergray" />
        </div>)
}

export default UserFeed
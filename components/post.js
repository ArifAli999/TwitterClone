import { useState, useEffect } from 'react'
import { supabase } from '../util/supabaseClient'
import { uid } from 'uid';
import { BiPaperPlane } from 'react-icons/bi'
import { BsCameraVideo, BsImages } from 'react-icons/bs'
import { formatISO } from 'date-fns'
import { useUser } from '../context/user';


import React from 'react'
import { AiOutlineConsoleSql } from 'react-icons/ai';

function SubmitPost({ session }) {
  const [tweet, setTweet] = useState(''); // state for tweet input.
  const [userTweets, setUserTweets] = useState(); // store user tweets



  const { user } = useUser();





  async function addPost() {

    if (tweet.trim().length > 0) {

      try {
        const tweetid = uid();
        const x = user && user.map((p) => (p.username)).toString()


        const { data, error } = await supabase
          .from('tweets')
          .insert([
            {
              tweetid: `${tweetid}`, userid: `${session.user.id}`,
              content: tweet, createdAt: formatISO(new Date()), username: x
            }
          ])



        setTweet('')
        if (error) {
          throw error
        }
      } catch (error) {
        alert(error.message)
      } finally {

        alert('added')
      }

    }

    else {
      alert('please enter a tweet')
    }


  }




  return (
    <div className=' bg-black flex flex-col h- w-  gap-0 border border-darkgray  rounded  items-center shadow-lg drop-shadow-lg  shadow-black/70 -z-20'>
      <div className='w-full p-4 -mb-1 '>
        <textarea className='w-full h- p-4 -z-50 border border-darkgray rounded bg-darkgray/30 placeholder-gray-600/90 text-white text-base font-bold  focus:outline-0 focus:ring-1 focus:ring-violet-500'
          type="text" placeholder="Whats on your mind today?" value={tweet} onChange={(e) => setTweet(e.target.value)} />

      </div>

      <div className='bg-black w-full flex justify-between items-center px-4 py-1'>
        <div className='p-0 flex items-center gap-2 mb-2'>
          <button className='text-white text-center flex items-center text-base  p-1.5
           hover:text-violet-600 hover:rounded-full duration-500 transition-all ease-linear'
            onClick={addPost}>
            <BsImages size={22} />
          </button>
          <button className='text-white text-center flex items-center text-base  p-1.5
           hover:text-violet-600 duration-500 transition-all ease-linear'
            onClick={addPost}>
            <BsCameraVideo size={22} />
          </button>
        </div>




        <div className='p-0 mb-2 -mt-1'>

          <button className='text-white text-center flex items-center text-sm bg-darkgray/90 rounded-lg border border-bordergray font-medium  px-2 py-1
          hover:bg-violet-800/70 hover:text-white hover:rounded-sm  duration-500 transition-all ease-linear'
            onClick={addPost}>
            GO
          </button>


        </div>
      </div>


    </div>




  )
}

export default SubmitPost
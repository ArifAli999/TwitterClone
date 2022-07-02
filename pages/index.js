import { useState, useEffect } from 'react'
import { supabase } from '../util/supabaseClient'
import Auth from '../components/Auth'
import SubmitPost from '../components/post'
import React from 'react'
import UserFeed from '../components/Feed'
import TrendingComp from '../components/Trending'
import TrendingPost from '../components/TrendingPost'
import { useSession } from '../context'
import { useUser } from '../context/user'




export default function Home() {


  const { session } = useSession()
  const { user } = useUser()


  const [currUser, setCurrUser] = useState(null);
  const [tweets, setTweets] = useState([]);


  useEffect(() => {
    getCurrentUser();
    getAllTweets()
  }, [session])


  async function getAllTweets() {
    try {
      const { data, error } = await supabase
        .from('tweets')
        .select(`*, Comments(
                 *
                ), profiles(*)`)
        .order('createdAt', { ascending: false })



      setTweets(data);


      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {

    }
  }



  async function getCurrentUser() {
    if (session) {
      try {

        const { data, error } = await supabase
          .from('tweets')
          .select('*, profiles!inner(*), Comments(*)')
          .eq('userid', session.user.id)



        if (error) {
          throw error
        }
      } catch (error) {
        alert(error.message)
      } finally {

      }

    }
  }







  return (
    <div className="w-full h-full   ">


      {!session ? <Auth /> :
        (






          <div className='flex '>
            <div className='mt-4 p-4 md:p-4 mb-10 overflow-hidden flex-1 '>
              <SubmitPost session={session} setTweets={setTweets} getAllTweets={getAllTweets} />
              <div className='mt-10    '>

                <UserFeed tweets={tweets} setTweets={setTweets} getAllTweets={getAllTweets} />



              </div>
            </div>


            <div className='text-white  border-b border-t md:border-l md:border-t-0 border-bordergray  w-2/5  -z-50 sticky top-0 overflow  md:block hidden'>

              <div className='p-4  sticky top-0'>
                <TrendingComp />

                <TrendingPost />
              </div>

            </div>
          </div>

        )

      }
    </div>
  )
}
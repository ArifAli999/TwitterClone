import { useState, useEffect } from 'react'
import { supabase } from '../util/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'
import SubmitPost from '../components/post'
import React from 'react'
import Header from '../components/Header'
import UserFeed from '../components/Feed'
import Footer from '../components/Footer'
import UserMenu from '../components/UserMenu'
import TrendingComp from '../components/Trending'
import TrendingPost from '../components/TrendingPost'
import { useSession } from '../context'


export default function Home() {
  const { session } = useSession()
  const [currUser, setCurrUser] = useState(null);
  const [tweets, setTweets] = useState([]);

  async function getGlobalTweets() {
    try {


      const { data, error } = await supabase
        .from('tweets')
        .select()
        .order('createdAt', { ascending: false });


      setTweets(data)


      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {

    }
  }



  useEffect(() => {
    if (session) {
      getGlobalTweets()
    }

    getCurrentUser();


  }, [session])


  async function getCurrentUser() {

    if (session) {
      try {
        let x = '';


        const { data, error } = await supabase
          .from('profiles')
          .select()
          .eq('id', `${session.user.id}`)


        setCurrUser(data)
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
    <div className="w-full  ">


      {!session ? <Auth /> :
        (






          <div className='flex '>
            <div className='mt-4 p-4 md:p-4 mb-10 overflow-hidden flex-1 '>
              <SubmitPost session={session} currUser={currUser} tweets={tweets} setTweets={setTweets} />
              <div className='mt-10    '>
                <UserFeed tweets={tweets} setTweet={setTweets} />


              </div>
            </div>


            <div className='text-white  border-b border-t md:border-l md:border-t-0 border-bordergray  w-2/5  -z-50 sticky top-0 overflow '>

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
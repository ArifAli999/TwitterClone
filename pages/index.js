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

export default function Home() {
  const [session, setSession] = useState(null);
  const [userInfo, setUserInfo] = useState(null)


  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])


  useEffect(() => {
    if (session) {
      getCurrentUser()
    }

    if (!session) {
      setUserInfo(null);
    }

  }, [session])



  async function getCurrentUser() {
    try {
      let x = '';

      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', `${session.user.id}`)


      setUserInfo(data)
      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {

    }
  }


  return (
    <div className="w-full h-full ">
      <Header session={session} setUserInfo={setUserInfo} userInfo={userInfo} className='z-50' />

      {!session ? <Auth /> :
        (


          <div className='flex md:flex-row flex-col w-full min-h-screen gap-0 p-0'>

            <div className='text-white  border-b border-t md:border-r md:border-t-0 md:border-b-0 border-bordergray   w-full md:w-1/5 md:sticky  '>
              <div className='h-full  w-full'>
                <UserMenu />
              </div>
            </div>

            <div className=' p-0  md:w-4/6 w-full'>
              <div className='mt-4 p-4 md:p-4 mb-10 sticky'>
                <SubmitPost session={session} />
              </div>

              <div className='mt-10  w-full  md:overflow-scroll  '>
                <UserFeed />
                <br />

              </div>
            </div>

            <div className='text-white  border-b border-t md:border-l md:border-t-0 border-bordergray  w-2/6 sticky -z-50'>

              <div className='p-4'>
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
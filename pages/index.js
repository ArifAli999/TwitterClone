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


      {!session ? <Auth /> :
        (






          <><div className='mt-4 p-4 md:p-4 mb-10 sticky'>
            <SubmitPost session={session} />
          </div><div className='mt-10  w-full  md:overflow-scroll  '>
              <UserFeed />


            </div></>


















        )

      }
    </div>
  )
}
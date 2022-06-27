import { useState, useEffect } from 'react'
import { supabase } from '../util/supabaseClient'
import Auth from '../components/Auth'
import SubmitPost from '../components/post'
import React from 'react'
import UserFeed from '../components/Feed'
import TrendingComp from '../components/Trending'
import TrendingPost from '../components/TrendingPost'
import { useSession } from '../context'
import useSWR, { mutate, useSWRConfig } from 'swr'
import InfiniteScroll from "react-infinite-scroll-component";



const fetcher = (url) => fetch(url, { method: "GET" }).then((res) => res.json());


export default function Home() {

  const { data: tweetList, error: tweetError } = useSWR("/api/profille", fetcher);
  console.log(tweetList)

  const { session } = useSession()
  const [currUser, setCurrUser] = useState(null);


  useEffect(() => {
    getCurrentUser();
  }, [session])


  async function getCurrentUser() {
    if (session) {
      try {

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
    <div className="w-full h-full   ">


      {!session ? <Auth /> :
        (






          <div className='flex '>
            <div className='mt-4 p-4 md:p-4 mb-10 overflow-hidden flex-1 '>
              <SubmitPost session={session} currUser={currUser} />
              <div className='mt-10    '>

                <UserFeed tweets={tweetList} />



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
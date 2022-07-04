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
import { useQuery } from 'react-query'
import { useIsFetching } from 'react-query'
import LoadingSpinnner from '../components/Spinner'




export default function Home() {


  const { session } = useSession()
  const { user } = useUser()
  const [currUser, setCurrUser] = useState(null);
  const [tweets, setTweets] = useState([]);

  const isFetching = useIsFetching()



  const qr = useQuery('tweets', getAllTweets)






  async function getAllTweets() {
    try {
      const { data, error } = await supabase
        .from('tweets')
        .select(`*, Comments(
                 *
                ), profiles(*)`)
        .order('createdAt', { ascending: false })
      if (error) {
        throw error
      }
      return data
    } catch (error) {
      alert(error.message)
    } finally {

    }
  }











  return (
    <div className="w-full h-full   ">
      {!session ? <Auth /> :
        (





          <div className='flex '>
            <div className='mt-4 p-4 md:p-4 mb-10 overflow-hidden flex-1 '>
              <SubmitPost session={session} />
              <div className='mt-10    '>

                <UserFeed tweets={qr.data} />



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
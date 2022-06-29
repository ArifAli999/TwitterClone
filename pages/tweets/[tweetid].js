import { useRouter } from 'next/router'
import UserFeed from '../../components/Feed'
import { supabase } from '../../util/supabaseClient'
import { useSession } from '../../context/index'
import { useState, useEffect } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import TweetComp from '../../components/TweetComp'


export default function SingleTweet({ post, id }) {


    const { session } = useSession()
    const [tweets, setTweets] = useState(null);
    const [currUser, setCurrUser] = useState(null);

    const router = useRouter()
    if (router.isFallback) {
        return <div className='text-purple-400 text-center font-bold'>Loading...</div>
    }

    useEffect(() => {
        getCurrentUser()
    }, [session])

    async function getCurrentUser() {

        if (session) {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select()
                    .eq('id', session.user.id)


                setCurrUser(data)
                console.log(data)

                if (error) {
                    throw error
                }
            } catch (error) {
                alert(error.message)
            } finally {

            }

        }


    }

    async function getTweets() {


        if (session) {
            try {
                const { data, error } = await supabase
                    .from('tweets')
                    .select(`*, Comments(
                 *
                ), profiles(*)`)
                    .eq('tweetid', id)
                    .order('createdAt', { ascending: false })


                setTweets(data)
                console.log(tweets)


                if (error) {
                    throw error
                }
            } catch (error) {
                alert(error.message)
            } finally {

            }

        }

    }

    useEffect(() => {

        getTweets();

    }, [session])




    return (
        <div className='relative '>
            <div className=' p-4 w-full bg-tonedblack/70 flex gap-4 border-b border-bordergray'>
                <BiArrowBack size={26} className='text-white
                hover:text-purple-300 duration-300 transition-all ease-linear cursor-pointer' onClick={() => router.back()} />
                <span className='text-white text-base font-thin'>Go back</span>
            </div>





            <div className='md:p-6 mt-4'>
                <TweetComp tweets={tweets} session={session} currUser={currUser} getTweets={getTweets} />
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const { data, error } = await supabase
        .from('tweets')
        .select()
    const paths = data.map(post => ({ params: { tweetid: JSON.stringify(post.tweetid) } }))
    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps({ params }) {
    const { tweetid } = params
    console.log(tweetid)



    const { data, error } = await supabase
        .from('tweets')
        .select(`*, Comments(
                 *
                ), profiles(*)`)
        .eq('tweetid', tweetid)
        .order('createdAt', { ascending: false })





    return {
        props: {
            post: data,
            id: tweetid

        }

    }

}
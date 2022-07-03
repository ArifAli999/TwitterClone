import { useRouter } from 'next/router'
import UserFeed from '../../components/Feed'
import { supabase } from '../../util/supabaseClient'
import { useSession } from '../../context/index'
import { useState, useEffect } from 'react'


export default function Post({ id }) {
    const { session } = useSession()
    const [user, setUser] = useState(null);
    const [data, setData] = useState(null)

    const router = useRouter()
    if (router.isFallback) {
        return <div className='text-purple-400 text-center font-bold'>Loading...</div>
    }

    useEffect(() => {
        getCurrentUser()
        getAllTweets()
    }, [session])


    async function getAllTweets() {
        try {
            const { data, error } = await supabase
                .from('tweets')
                .select(`*, Comments(
                 *
                ), profiles(*)`)
                .eq('userid', id)
                .order('createdAt', { ascending: false })



            console.log(data)
            setData(data)


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
                    .from('profiles')
                    .select()
                    .eq('id', id)


                setUser(data)

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
        <div>
            {user && user.map((u) => (
                <h1 className="text-5xl mt-4 font-semibold tracking-wide p-6 text-white">{u.username}</h1>

            ))}


            <div className='p-6'>
                <UserFeed tweets={data} session={session} getAllTweets={getAllTweets} />
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const { data, error } = await supabase
        .from('tweets')
        .select()
    const paths = data.map(post => ({ params: { userid: JSON.stringify(post.userid) } }))
    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps({ params }) {
    const { userid } = params




    return {
        props: {

            id: userid

        }

    }

}
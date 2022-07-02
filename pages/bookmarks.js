import React, { useState, useEffect } from 'react'
import { supabase } from '../util/supabaseClient'
import { useSession } from '../context'
import UserFeed from '../components/Feed'
import Auth from '../components/Auth'
import BookmarksComp from '../components/BookmarksComp'

function UserBookmark() {
    const { session } = useSession()
    const [bookmarks, setBookmarks] = useState(null);

    async function getAllTweets() {
        try {
            const { data, error } = await supabase
                // go to the bookmarks table, get all the data where userid = session.user.id and also
                // fetch the corresponding tweets.
                // might need too develop a new <Feed>component</Feed> because the retur array is arranged differently.
                // Similar approach to get user likes.
                .from('Bookmarks')
                .select(`*, tweets(*, profiles!inner(*)))`)
                .match({ userid: `${session.user.id}` })
                .order('created_at', { ascending: false })
            setBookmarks(data)
            console.log(data)

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
            getAllTweets()

        }
    }, [session])

    console.log(bookmarks)

    return (
        <>
            {!session ? <Auth /> :
                (<div className='p-4'>
                    <h2 className='text-white text-2xl font-thin mb-4 mt-4 ml-4'>Account Settings</h2>
                    <div className='flex flex-col justify-between'>

                        <BookmarksComp bookmarks={bookmarks} setBookmarks={setBookmarks} getAllTweets={getAllTweets} />

                    </div>

                </div>)}

        </>






    )
}






export default UserBookmark
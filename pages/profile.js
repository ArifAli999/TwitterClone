import React, { useState, useEffect } from 'react'
import { supabase } from '../util/supabaseClient'
import { useSession } from '../context'
import GeneralInfo from '../components/useraccount/GeneralInfo'
import Auth from '../components/Auth'
import UserFeed from '../components/Feed';

function UserProfilePage() {
    const { session } = useSession()
    const [currUser, setCurrUser] = useState(null);
    const [userTweets, setUserTweets] = useState([]);


    useEffect(() => {



        getCurrentUser()
        getAllTweets()

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


    async function getAllTweets() {
        if (session) {
            try {

                const { data, error } = await supabase
                    .from('tweets')
                    .select(`*, Comments(
                 *
                ), profiles(*)`)

                    .eq('userid', `${session.user.id}`)

                setUserTweets(data)

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
        <>
            {!session ? <Auth /> :
                (

                    <div className='w-full mx-auto p-4'>

                        <div className='p-2 flex w-full flex-col'>



                            <div className='flex gap-2 items-center w-full mt-4 mb-6 p-6 bg-black rounded border border-bordergray'>
                                <div className=' h-full ml-4 '>
                                    <img src='https://i.imgur.com/VEF1XNz.png' className='w-24 h-24 object-fill rounded-full shadow-md shadow-black border border-purple-400'></img>

                                </div>
                                <div className=''>
                                    <h2 className='text-white text-2xl font-bold mb-4 mt-4 ml-4'>
                                        {currUser && currUser.map((m) => m.username)}
                                    </h2>
                                </div>

                            </div>


                        </div>



                        <div className='flex flex-col justify-between'>
                            <UserFeed tweets={userTweets} getAllTweets={getAllTweets} />

                        </div>

                    </div>

                )}

        </>






    )
}

export default UserProfilePage
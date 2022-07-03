import React, { useState, useEffect } from 'react'
import { supabase } from '../util/supabaseClient'


function UserPictures({ imgUrl }) {
    const [data, setData] = useState();
    console.log(data)
    //use effect to fetch on mount

    async function getImages(url) {

        try {
            const { data, error } = await supabase.storage.from('avatars').createSignedUrl(url, 60000000)
            if (error) {
                throw error
            }
            if (data) {
                setData(data.signedURL)
            }

        } catch (error) {
            console.log('Error downloading image: ', error.message)
        }
        finally {

        }



    }
    useEffect(() => {

        getImages(imgUrl)

    }, [])

    if (data === undefined) return null //you can return some loader here


    return (
        <div className='w-14 h-14'>
            <img src={data} className=" object-cover align-middle max-w-full h-full rounded-full border border-bordergray" />
        </div>)
}

export default UserPictures
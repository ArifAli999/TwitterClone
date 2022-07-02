import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { supabase } from '../../util/supabaseClient'
import { useSession } from '../../context'
import { useUser } from '../../context/user';
import { useRouter } from 'next/router'
import Router from 'next/router'
import { AiOutlineClose } from 'react-icons/ai'


function UserPic() {
    let [isOpen, setIsOpen] = useState(false)
    const [currUser, setCurrUser] = useState('')
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)



    useEffect(() => {
        getProfile()
    }, [session])


    async function getProfile() {
        try {
            setLoading(true)
            const user = supabase.auth.user()

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`username, website, avatar_url`)
                .eq('id', session.user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUsername(data.username)

                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile({ avatar_url }) {
        try {
            setLoading(true)
            const user = supabase.auth.user()

            const updates = {
                id: user.id,
                avatar_url,
                username,
                updated_at: new Date(),
            }

            let { error } = await supabase.from('profiles').upsert(updates, {
                returning: 'minimal', // Don't return the value after inserting
            })

            if (error) {
                throw error
            }

            if (!error) {
                setIsOpen(false)
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }



    const { session } = useSession();
    const { user } = useUser();
    const x = user && user.map(user => user.username);


    useEffect(() => {
        setCurrUser(user && user.map(user => user.username))
    }, [user])


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }




    return (
        <div className='p-4 mt-2  flex w-full  justify-between items-center border-b border-bordergray'>
            <div className=''>
                <p className='text-bold text-md text-white'>Profile Picture</p>
                <span className='font-thin text-gray-300/70 text-sm '>Update or remove your profile picture</span>
            </div>

            <div className=''>
                <Modal isOpen={isOpen} setIsOpen={setIsOpen}
                    closeModal={closeModal} openModal={openModal}
                    username={username} setUsername={setUsername}
                    updateProfile={updateProfile}
                    getProfile={getProfile} url={avatar_url}
                    size={150}
                    onUpload={(url) => {
                        setAvatarUrl(url)
                        updateProfile({ avatar_url: url })
                    }} />
            </div>



        </div>


    )
}


const Modal = ({ openModal, closeModal, isOpen, updateProfile, url, size, onUpload, setIsOpen }) => {

    const [avatarUrl, setAvatarUrl] = useState(null)
    const [uploading, setUploading] = useState(false)


    console.log(url)


    useEffect(() => {
        if (url) downloadImage(url)
    }, [url])

    async function downloadImage(path) {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path)
            if (error) {
                throw error
            }
            const url = URL.createObjectURL(data)
            setAvatarUrl(url)
        } catch (error) {
            console.log('Error downloading image: ', error.message)
        }
    }


    async function uploadAvatar(event) {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            let { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file)



            if (uploadError) {
                throw uploadError
            }

            onUpload(filePath)

            setIsOpen(false)
        } catch (error) {
            alert(error.message)
        } finally {
            setUploading(false)
        }
    }




    return (
        <>
            <div className="">
                <button
                    type="button"
                    onClick={openModal}
                    className="text-bold hover:bg-lightblack border border-bordergray p-2 rounded bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                    SELECT
                </button>


            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => { }}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-90" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-black border border-lightgray  text-left align-middle shadow-xl shadow-lightblack transition-all">
                                    <Dialog.Title
                                        as="div"
                                        className="text-lg font-medium p-4 text-stone-300 w-full bg-black border-b border-lightgray items-center flex justify-between"
                                    >
                                        <div>
                                            Profile Picture
                                        </div>


                                        <div>
                                            <button
                                                type="button"
                                                onClick={closeModal}
                                                className="text-bold  border border-bordergray bg-purple-500/70 rounded-full  p-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 hover:bg-black duration-300 transition-all ease-in-out hover:text-purple-500"
                                            >
                                                <AiOutlineClose />
                                            </button>
                                        </div>

                                    </Dialog.Title>


                                    <div className="m  ">
                                        <div className="flex text-white items-center h-full mt- w-full bg-black border-b border-bordergray p-2">

                                            <div className='p-4 w-full h-full'>
                                                <div className='flex flex-col items-center'>
                                                    {avatarUrl ? (
                                                        <img
                                                            src={avatarUrl}
                                                            alt="Avatar"
                                                            className="w-1/2 h-1/2 rounded-full"

                                                        />
                                                    ) : (
                                                        <img
                                                            src={avatarUrl}
                                                            alt="Avatar"
                                                            className="w-1/2 h-1/2 rounded"

                                                        />
                                                    )}
                                                    <div className='mt-4 bg-lightblack p-2 rounded  border-bordergray border hover:border-violet-800 hover:text-violet-500 shadow-lightblack transition-all ease-in-out duration-300'>
                                                        <label className="mt-4 cursor-pointer p-4 rounded-md" htmlFor="single">
                                                            {uploading ? 'Uploading ...' : 'Upload'}
                                                        </label>

                                                        <input
                                                            style={{
                                                                visibility: 'hidden',
                                                                position: 'absolute',
                                                            }}
                                                            type="file"
                                                            id="single"
                                                            accept="image/*"
                                                            onChange={uploadAvatar}
                                                            disabled={uploading}

                                                        />
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                    <div className="mt-2 p-4 text-center">

                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md   border border-bordergray px-4 py-2 text-sm font-medium text-white hover:bg-lightblack hover:shadow-md  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={updateProfile}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )

}
export default UserPic
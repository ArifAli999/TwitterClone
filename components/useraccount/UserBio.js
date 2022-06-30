import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { supabase } from '../../util/supabaseClient'
import { useSession } from '../../context'
import { useUser } from '../../context/user';
import { useRouter } from 'next/router'
import Router from 'next/router'


function UserBio() {
    let [isOpen, setIsOpen] = useState(false)
    const [username, setUsername] = useState('');
    const [currUser, setCurrUser] = useState('')




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


    async function updateProfile() {
        try {





            const { data, error } = await supabase
                .from('profiles')
                .update({ bio: username })
                .match({ id: session.user.id })
            alert('updated')

            if (error) {
                throw error
            }
        } catch (error) {
            alert(error.message)
        } finally {
            Router.reload(window.location.pathname)
            setUsername('')
            setIsOpen(false)

        }
    }

    return (
        <div className='p-4 mt-2  flex w-full  justify-between items-center border-b border-bordergray'>
            <div className=''>
                <p className='text-bold text-md text-white'>Update Bio</p>
                <span className='font-thin text-gray-300/70 text-sm '>Tell the world about yourself</span>
            </div>

            <div className=''>
                <Modal isOpen={isOpen} setIsOpen={setIsOpen}
                    closeModal={closeModal} openModal={openModal}
                    username={username} setUsername={setUsername}
                    updateProfile={updateProfile} currUser={currUser} />
            </div>



        </div>


    )
}


const Modal = ({ openModal, isOpen, closeModal, username, setUsername, updateProfile, currUser }) => {


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
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                        className="text-lg font-medium p-4 text-stone-300 w-full bg-black border-b border-lightgray items-center"
                                    >
                                        BIO
                                    </Dialog.Title>


                                    <div className="m  ">
                                        <div className="flex text-white items-center h-full mt- w-full bg-black border-b border-bordergray p-2">

                                            <div className='p-4 w-full h-full'>
                                                <textarea className='text-white/85 w-full h-full font-base bg-lightblack border-bordergray border  p-6 rounded-md  text-xs focus:outline-none focus:ring-0 focus:border-b focus:border-purple-400 placeholder-gray-400 ' placeholder='Enter new bio'
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}></textarea>
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
export default UserBio
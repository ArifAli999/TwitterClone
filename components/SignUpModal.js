import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { AiOutlineClose } from 'react-icons/ai'
import { useState } from 'react'
import { supabase } from '../util/supabaseClient'



function SignUpModal({ signUpModal, setSignUpModal }) {


    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');


    function closeModal() {
        setSignUpModal(false)
    }


    const handleSignUp = async () => {
        try {
            setLoading(true);

            const { user, session, error } = await supabase.auth.signUp(
                {
                    email: email,
                    password: password,
                },
                {
                    data: {
                        username: username

                    }
                }
            )

            if (error) throw error
            alert('Account registered.')

        } catch (error) {
            alert(error.error_description || error.message)
        }
        finally {
            setLoading(false)
            setSignUpModal(false)
        }
    }





    return (
        <>



            <Transition appear show={signUpModal} as={Fragment}>
                <Dialog as="div" className="relative z-10 bg-black" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-violet-500 bg-opacity-95" />
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-black/80 p- text-left align-middle shadow-lg shadow-black/70 transition-all relative">
                                    <Dialog.Title
                                        as="div"
                                        className="text-lg w-full flex items-center bg-black p-4 border-b border-gray-600/60 font-medium leading-6 text-white"
                                    >
                                        <div className='w-full flex-1'>
                                            <h3> Register</h3>
                                        </div>


                                        <div className=' top-0 right-0 flex items-center' onClick={closeModal}>
                                            <span className=' text-white p-1.5 text-xs  rounded cursor-pointer hover:text-purple-300 duration-300 transition-all ease-in'><AiOutlineClose size={20} /></span>
                                        </div>

                                    </Dialog.Title>
                                    <div className='flex flex-col justify-between w-full bg-black/90 p-4'>
                                        <div className="p-2 flex flex-col items-center justify-center gap-4 w-full mt-2">

                                            <>

                                                <label className='w-full text-xs mb-0 text-gray-50/80 font-bold'>
                                                    Username
                                                    <input
                                                        placeholder="email"
                                                        type="text"
                                                        className="border-2 border-bordergray p-4 rounded-sm text-white w-full mt-2 focus:outline-none placeholder-lightgray  focus:border-purple-400/40  bg-tonedblack/70 "
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}

                                                    />
                                                </label>


                                                <label className='w-full text-xs mb-0 text-gray-50/80 font-bold'>
                                                    Email
                                                    <input
                                                        placeholder="email"
                                                        type="text"
                                                        className="border-2 border-bordergray p-4 rounded-sm text-white w-full mt-2 focus:outline-none placeholder-lightgray  focus:border-purple-400/40  bg-tonedblack/70 "
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}

                                                    />
                                                </label>

                                                <label className='w-full text-xs mb-0 text-gray-50/80 font-bold'>
                                                    Password
                                                    <input
                                                        placeholder="email"
                                                        type="text"
                                                        className="border-2 border-bordergray p-4 rounded-sm text-white w-full mt-2 focus:outline-none placeholder-lightgray  focus:border-purple-400/40  bg-tonedblack/70 "
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}

                                                    />
                                                </label>


                                            </>

                                        </div>

                                    </div>

                                    <div className="border-t border-gray-600/60 p-4 bg-black">
                                        <div className='flex justify-center bg-black '>
                                            <button onClick={(e) => {
                                                e.preventDefault()
                                                handleSignUp()
                                            }}
                                                className="bg-violet-500 px-4 text-xs text-white font-bold py-1.5 rounded border-violet-600 border-b-2 
                                            hover:bg-violet-600 transition-all mr-4 duration-500 ease-in-out cursor-pointer ">Sign Up</button>



                                        </div>
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

export default SignUpModal
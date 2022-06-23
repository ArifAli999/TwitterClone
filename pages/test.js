import React, {useState, Fragment} from 'react'
import {AiFillCaretRight, AiOutlineUser, AiOutlineHeart, AiOutlineCopy, AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai'
import { usePopper } from 'react-popper';
import { Dialog, Transition, Popover } from '@headlessui/react'
import SubmitPost from '../components/post';
import UserFeed from '../components/Feed';

import { supabase } from '../util/supabaseClient'

function UserPopOver({ setUserInfo}) {

    let [referenceElement, setReferenceElement] = useState()
    let [popperElement, setPopperElement] = useState()
    let { styles, attributes } = usePopper(referenceElement, popperElement)

    function handleSignOut () {
        supabase.auth.signOut()
        setUserInfo(null);
      }




  return (
    <div>
    <Popover className="relative  w-full text-right p-1">
    {({ open }) => (
        <>
            <Popover.Button
                className={`
          ${open ? 'text-lime-400 ' : ''}
          group inline-flex items-center  rounded-md text-purple-500 px-3 py-1.5 text-base font-semibold  hover:text-opacity-100 focus:outline-none focus-visible:ring-0 focus-visible:ring-opacity-75`}
            >
                <AiOutlineUser size={24} />
                <AiFillCaretRight
                    className={`${open ? 'rotate-90 transform text-lime-400 ' : ''}
            ml-2 h-5 w-5 text-white transition duration-150 ease-in-out group-hover:text-opacity-80`}
                    aria-hidden="true"
                />
            </Popover.Button>
            <Transition
                as={Fragment}
                enter="transition ease-in duration-200"
                enterFrom="opacity-0 "
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute right-0 w-full md:right-2 z-99 mt-6  min-w-lg md:w-fit transform px-4 sm:px-0 ">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">

                        <div className="bg-black/90  flex flex-col w-full ">
                            <div className=' border-b border-gray-300/30 p-2.5 flex w-full items-center gap-4 justify-center group transition duration-150 ease-in-out hover:bg-black'>
                                <div className='ml-2'>
                                    <AiOutlineCopy size={25} className='group-hover:text-lime-300  text-green-400 duration-300 transition-all ease-linear' />
                                </div>

                                <div className='flex-1'>
                                    <a
                                        href="##"
                                        className="flow-root rounded-md px-2 py-2  focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                    >
                                        <span className="flex items-center">
                                            <span className="text-sm font-bold text-purple-300">
                                                Your Tweets
                                            </span>
                                        </span>
                                        <span className="block text-sm text-gray-500 text-left">
                                            Explore tweets you have liked.
                                        </span>
                                    </a>

                                </div>


                            </div>

                            <div className=' border-b border-gray-300/30 p-2.5 flex w-full items-center gap-4 justify-center group transition duration-150 ease-in-out hover:bg-black'>
                                <div className='ml-2'>
                                    <AiOutlineHeart size={25} className='group-hover:text-red-500 text-pink-400 duration-300 transition-all ease-linear' />
                                </div>

                                <div className='flex-1'>
                                    <a
                                        href="##"
                                        className="flow-root rounded-md px-2 py-2  focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                    >
                                        <span className="flex items-center">
                                            <span className="text-sm font-bold text-purple-300">
                                                Your Favourites
                                            </span>
                                        </span>
                                        <span className="block text-sm text-gray-500 text-left">
                                            Explore tweets you have liked.
                                        </span>
                                    </a>

                                </div>


                            </div>

                            <div className=' border-b border-gray-300/30 p-2.5 flex w-full items-center gap-4 justify-center group transition duration-150 ease-in-out hover:bg-black'>
                                <div className='ml-2'>
                                    <AiOutlineSetting size={25} className='group-hover:text-orange-400 text-indigo-100 duration-300 transition-all ease-linear' />
                                </div>

                                <div className='flex-1'>
                                    <a
                                        href="##"
                                        className="flow-root rounded-md px-2 py-2  focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                    >
                                        <span className="flex items-center">
                                            <span className="text-sm font-bold text-purple-300">
                                                Account Settings
                                            </span>
                                        </span>
                                        <span className="block text-sm text-gray-500 text-left">
                                            Edit or view your account information.
                                        </span>
                                    </a>

                                </div>


                            </div>

                            <div onClick={() => handleSignOut()}
                            className=' border-b border-gray-300/30 p-2.5 flex w-full items-center gap-4 justify-center group transition duration-150 ease-in-out hover:bg-black'>
                                <div className='ml-2'>
                                    <AiOutlineLogout size={25} className='group-hover:text-sky-900 duration-300 transition-all ease-linear text-violet-500' />
                                </div>

                                <div className='flex-1'>
                                    <a
                                        href="##"
                                        className="flow-root rounded-md px-2 py-2  focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                    >
                                        <span className="flex items-center">
                                            <span className="text-sm font-bold text-purple-300">
                                                Logout
                                            </span>
                                        </span>
                                        <span className="block text-sm text-gray-500 text-left">
                                            Sign out of your account securely.
                                        </span>
                                    </a>

                                </div>


                            </div>




                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </>
    )}
</Popover>

<div className=' h-full  w-full z-30'>
          <div className='flex  w-full h-full gap-0 p-0'>
            <div className='text-white   border-r border-bordergray h-full w-1/4  sticky'>
            <div className='mt-10  w-full'>
              Sidebar
              </div>
            
              
            </div>

            <div className=' p-0 flex-1 overflow-scroll'>
              <div className='mt-4 md:p-4 mb-10'>
              <SubmitPost />
              </div>

              <div className='mt-10  w-full '>
              <UserFeed/>
              <br/>
             
              </div>
            </div>

            <div className='text-white  border-l border-bordergray h-full w-1/4 -z-50 '>
              <div className='mt-10  w-full'>
               jkfdskjfksdfk
              </div>
            </div>

            

          
          </div>
        
</div>
</div>


  )
}

export default UserPopOver;
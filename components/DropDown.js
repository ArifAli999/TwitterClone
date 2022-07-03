import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { BsThreeDots, BsPen, BsTrash2, BsBookmarkPlus } from 'react-icons/bs'
import { MdReport } from 'react-icons/md'
import React from 'react';
import { supabase } from '../util/supabaseClient'
import { useSession } from '../context'


function DropDown({ tweetid, setBookmarks, bookmarks, getAllTweets }) {

    const { session } = useSession()

    async function deleteCmment(tweetid) {
        try {
            const { data, error } = await supabase
                .from('Comments')
                .delete()
                .match({ tweetid: tweetid })







            if (error) {
                throw error
            }
            if (!error) {

            }
        } catch (error) {
            alert(error.message)
        }
    }

    async function deleteBookmarks(tweetid) {
        try {
            const { data, error } = await supabase
                .from('Bookmarks')
                .delete()
                .match({ tweetid: tweetid })







            if (error) {
                throw error
            }
            if (!error) {

            }
        } catch (error) {
            alert(error.message)
        }
    }


    async function deleteTweet(tweetid) {
        deleteBookmarks(tweetid) && deleteCmment(tweetid)

        try {

            const { data, error } = await supabase
                .from('tweets')
                .delete()
                .match({ tweetid: tweetid })





            if (error) {
                throw error
            }
            if (!error) {
                alert('deleted')
            }
        } catch (error) {
            alert(error.message)
        } finally {
            getAllTweets()
        }
    }

    async function addBookmark(tweetid) {

        try {
            const { data, error } = await supabase
                .from('Bookmarks')
                .insert([
                    { id: `${session.user.id}_${tweetid}`, userid: session.user.id, tweetid: tweetid }
                ])





            if (error) {
                throw error
            }
            if (!error) {
                alert('bookmarked')
            }
        } catch (error) {
            alert(error.message)
        } finally {

        }
    }







    return (
        <div className="z-30">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20  text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none ">
                        <BsThreeDots size={20} className='text-white cursor-pointer hover:text-violet-600 transition-all duration-300 ease-in-out' />

                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-300 border border-darkgray shadow-md shadow-black  bg-tonedblack  ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className=" ">
                            <Menu.Item>
                                {({ active }) => (
                                    <button

                                        className='hover:bg-darkgray transition-all duration-300 ease-linear text-white rounded-none border-b border-darkgray
                                        group flex w-full items-center px-2 py-2 text-sm group gap-2'


                                    >

                                        <BsPen
                                            className="mr-2  text-purple-white group-hover:text-pink-500 transition-all duration-300 ease-in-out"
                                            aria-hidden="true"

                                        />

                                        Edit
                                    </button>
                                )}
                            </Menu.Item>


                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className='hover:bg-darkgray transition-all duration-300 ease-linear text-white rounded-none border-b border-darkgray
                                        group flex w-full items-center px-2 py-2 text-sm gap-2'
                                        onClick={() => {
                                            deleteBookmarks(tweetid)
                                            deleteCmment(tweetid)
                                            deleteTweet(tweetid)
                                        }}
                                    >
                                        <BsTrash2
                                            className="mr-2  text-purple-white group-hover:text-pink-500 transition-all duration-300 ease-in-out"
                                            aria-hidden="true"


                                        />
                                        Delete
                                    </button>
                                )}
                            </Menu.Item>


                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className='hover:bg-darkgray transition-all duration-300 ease-linear text-white rounded-none border-b border-darkgray
                                        group flex w-full items-center px-2 py-2 text-sm gap-2'
                                        onClick={() => addBookmark(tweetid)}
                                    >
                                        <BsBookmarkPlus
                                            className="mr-2  text-purple-white group-hover:text-pink-500 transition-all duration-300 ease-in-out"
                                            aria-hidden="true"

                                        />
                                        Bookmark
                                    </button>
                                )}
                            </Menu.Item>


                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className='hover:bg-darkgray transition-all duration-300 ease-linear text-white rounded-none border-b border-darkgray
                                        group flex w-full items-center px-2 py-2 text-sm gap-2'
                                    >
                                        <MdReport
                                            className="mr-2  text-purple-white group-hover:text-pink-500 transition-all duration-300 ease-in-out"
                                            aria-hidden="true"

                                        />
                                        Report
                                    </button>
                                )}
                            </Menu.Item>



                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default DropDown
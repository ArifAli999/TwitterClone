import { useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import UserFeed from '../components/Feed';

const fetcher = (url) => fetch(url, { method: "GET" }).then((res) => res.json());


const Tasks = () => {
    const { data: commentList, error: commentListError } = useSWR("/api/profille", fetcher);
    console.log(commentList)

    return (
        <UserFeed tweets={commentList} />

    )
}
export default Tasks
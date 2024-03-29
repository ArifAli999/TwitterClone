import jwt_decode from 'jwt-decode';
import { useState, useEffect } from 'react'
import { supabase } from '../../util/supabaseClient'
import { useSession } from '../../context/index'


const CommentsApi = async (req, res) => {
    switch (req.method) {
        // Get all comments
        case "GET":
            const { data: getData, error: getError } = await supabase.from("tweets").select("*", { count: "exact" }).order('createdAt', { ascending: false })
            if (getError) {
                return res.status(500).json({ message: getError.message });
            }
            return res.status(200).json(getData);
        // Add comment
        case "CUSTOM":
            const tweetid = req.body;


            const { data: postData, error: postError } = await supabase
                .from('tweets')
                .delete()
                .match({ tweetid: tweetid })

            if (postError) {
                return res.status(500).json({ message: postError.message });
            }
            return res.status(200).json(postData);
        // Edit comment

    }
};

export default CommentsApi;
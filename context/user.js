import { useContext, useEffect, useState } from "react";// Create user context
import { createContext } from "react";
import { useSession } from "./index";
import { supabase } from '../util/supabaseClient'





export const UserDetails = createContext(null);
// UserContextProvider is the parent element of the entire application
export function UserDetailsProvider(props) {
    const [user, setUser] = useState([]);

    const { session } = useSession();



    async function getCurrentUser() {

        try {

            const { data, error } = await supabase
                .from('profiles')
                .select()
                .eq('id', `${session.user.id}`)


            setUser(data)
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
            getCurrentUser();
        }
    }, [session]);


    const value = {
        user,
    }

    return <UserDetails.Provider value={value} {...props} />;
};
// hook that can be used to get the session data
export function useUser() {
    const context = useContext(UserDetails);
    return context;
};



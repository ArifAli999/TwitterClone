import { useContext, useEffect, useState } from "react";// Create user context
import { createContext } from "react";
import { supabase } from '../util/supabaseClient'


export const UserContext = createContext(null);
// UserContextProvider is the parent element of the entire application
export function UserContextProvider(props) {
    const [session, setSession] = useState(null);

    useEffect(() => {
        // get session for user
        const session = supabase.auth.session();
        setSession(session);
        // configure the auth state listener
        // if the auth state changes the session will be updated
        // and a POST request will be made to the /api/auth route
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            setSession(session)
            console.log('changed')

        });
        return () => {
            authListener?.unsubscribe();
        };
    }, []);
    const value = {
        session,
    };
    return <UserContext.Provider value={value} {...props} />;
};
// hook that can be used to get the session data
export function useSession() {
    const context = useContext(UserContext);
    return context;
};
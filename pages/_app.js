import '../styles/global.css'
import SiteLayout from '../components/SiteLayout';
import "tailwindcss/tailwind.css";
import { supabase } from '../util/supabaseClient'
import { UserContextProvider } from '../context';
import { UserDetailsProvider } from '../context/user'
import { useSession } from '../context';


export default function MyApp({ Component, pageProps: { session, ...pageProps },
}) {





  return (
    <div className='scrollbar-hide'>

      <UserContextProvider>
        <UserDetailsProvider>
          <SiteLayout>
            <Component {...pageProps} />
          </SiteLayout>
        </UserDetailsProvider>

      </UserContextProvider>

    </div>


  )
}
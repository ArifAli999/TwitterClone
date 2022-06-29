import '../styles/global.css'
import SiteLayout from '../components/SiteLayout';
import "tailwindcss/tailwind.css";
import { supabase } from '../util/supabaseClient'
import { UserContextProvider } from '../context';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { SWRConfig } from 'swr'
import { useSession } from '../context'


export default function MyApp({ Component, pageProps: { session, ...pageProps },
}) {





  return (
    <div className='scrollbar-hide'>

      <UserContextProvider>

        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>

      </UserContextProvider>

    </div>


  )
}
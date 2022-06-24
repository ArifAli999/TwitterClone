import '../styles/global.css'
import SiteLayout from '../components/SiteLayout';
import "tailwindcss/tailwind.css";
import { useState, useEffect } from 'react';
import { supabase } from '../util/supabaseClient'
import { UserContextProvider } from '../context';

export default function MyApp({ Component, pageProps: { session, ...pageProps },
}) {






  return (
    <>
      <UserContextProvider>
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      </UserContextProvider>
    </>


  )
}
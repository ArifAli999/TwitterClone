import '../styles/global.css'
import SiteLayout from '../components/SiteLayout';
import "tailwindcss/tailwind.css";
import { supabase } from '../util/supabaseClient'
import { UserContextProvider } from '../context';
import { UserDetailsProvider } from '../context/user'
import { useSession } from '../context';
import { ReactQueryDevtools } from 'react-query/devtools'

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'





export default function MyApp({ Component, pageProps: { session, ...pageProps },
}) {

  const queryClient = new QueryClient()
  queryClient.invalidateQueries()




  return (
    <div className='scrollbar-hide'>

      <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          <UserDetailsProvider>
            <SiteLayout>
              <Component {...pageProps} />
            </SiteLayout>
          </UserDetailsProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </UserContextProvider>

    </div>


  )
}
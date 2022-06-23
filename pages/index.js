import { useState, useEffect } from 'react'
import { supabase } from '../util/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'
import SubmitPost from '../components/post'
import React from 'react'
import Header from '../components/Header'
import UserFeed from '../components/Feed'
import Footer from '../components/Footer'

export default function Home() {
  const [session, setSession] = useState(null);
  const [userInfo, setUserInfo] = useState(null)


  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  
  useEffect(() => {
      if(session) {
      getCurrentUser()
     }

     if(!session) {
      setUserInfo(null);
     }
    
  }, [session])



  async function getCurrentUser() {
    try {
      let x ='';
 
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', `${session.user.id}`)

     
      setUserInfo(data)
      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
       
    }
  }


  return (
    <div className="w-full h-full overflow">
     <Header session={session} setUserInfo={setUserInfo} userInfo={userInfo} className='z-50'/>

      {!session ? <Auth /> :
        (
        
         <div className=' h-full  w-full '>
          <div className='flex  w-full h-full gap-0 p-0'>
            <div className='text-white   border-r border-bordergray h-full w-1/4  sticky'>
            <div className='mt-10  w-full'>
              Sidebar
              </div>
            
              
            </div>

            <div className=' p-0 flex-1 overflow-scroll'>
              <div className='mt-4 md:p-4 mb-10'>
              <SubmitPost session={session} />
              </div>

              <div className='mt-10  w-full '>
              <UserFeed/>
              <br/>
             
              </div>
            </div>

            <div className='text-white  border-l border-bordergray h-full w-1/4 -z-50 sticky'>
              <div className='mt-10  w-full'>
               jkfdskjfksdfk
              </div>
            </div>

            

          
          </div>


          <div className=''>
            <Footer/>
          </div>

       

         
        
         </div>
         
     
          )

      }
    </div>
  )
}
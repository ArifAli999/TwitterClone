import { useState } from 'react'
import { supabase } from '../util/supabaseClient'
import LoginComp from './LoginComp';

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('');



  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })

      if (error) throw error
      alert('Check your email for the login link')

    } catch (error) {
      alert(error.error_description || error.message)
    }
    finally {
      setLoading(false)
    }
  }


  return (
    <div className="  h-full  ">
      <div className='flex items-center flex-col justify-center h-full  gap-2'>
        <div className='p-6 flex flex-col items-center gap-4 bg-black border border-bordergray rounded w-full md:w-4/12'>
          <div className='text-center'>
            <h1 className="text-white font-bold text-4xl md:text-4xl mb-2 mt-4">Welcome Guest</h1>
            <p className="text-violet-300 md:text-sm text-base font-thin mb-4 ">Please sign in to continue</p>
          </div>
          <div className='mt-2'>
            <LoginComp />
          </div>
          <div>
            <span className='text-gray-300 font-light text-sm'>Dont have an account?</span>
          </div>

        </div>

      </div>
    </div>
  )
}
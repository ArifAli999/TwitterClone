import React from 'react'
import { useState } from 'react'
import { supabase } from '../util/supabaseClient'
import RegisterModal from './RegisterModal';

function LoginComp() {
 
    const [registerModal, setRegisterModal] = useState(false);



  


    return (
        <div className='w-full  float-right'>
         {registerModal ? (<RegisterModal registerModal={registerModal} setRegisterModal={setRegisterModal} />) : null}
        <button
            onClick={(e) => {
               e.preventDefault()
                setRegisterModal(true);
            }}
            className="button t text-white border border-violet-500 px-4 py-1.5 rounded-md"
            > Login  </button>
</div>
           
    )
}

export default LoginComp
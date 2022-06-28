import React from 'react'
import { useState } from 'react'
import { supabase } from '../util/supabaseClient'
import RegisterModal from './RegisterModal';
import SignUpModal from './SignUpModal';
function LoginComp() {

    const [registerModal, setRegisterModal] = useState(false);
    const [signUpModal, setSignUpModal] = useState(false)






    return (
        <div className='w-full  float-right'>
            {registerModal ? (
                <>
                    <RegisterModal registerModal={registerModal} setRegisterModal={setRegisterModal} />
                    <SignUpModal signUpModal={signUpModal} setSignUpModal={setSignUpModal} />

                </>
            ) : null}
            {signUpModal ? (
                <>

                    <SignUpModal signUpModal={signUpModal} setSignUpModal={setSignUpModal} />

                </>
            ) : null}
            <button
                onClick={(e) => {
                    e.preventDefault()
                    setRegisterModal(true);
                }}
                className="button mr-4 text-white border border-violet-500 px-4 py-1.5 rounded-md"
            > Login  </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    setSignUpModal(true);
                }}
                className="button t text-white border border-violet-500 px-4 py-1.5 rounded-md"
            > Register  </button>
        </div>

    )
}

export default LoginComp
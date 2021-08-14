import React, { useState } from "react";

function LoginPage() {

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems:'center',
            width: '100%', height: '100vh'
        }}>

            <form style={{display: 'flex', flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                {/* value 부분에 prop & state를 넣어줘야 한다 */}
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br/>
                <button type="submit">
                    Login
                </button>
            </form>
        </div> 
    )
}

export default LoginPage
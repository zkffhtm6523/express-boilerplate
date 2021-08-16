import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom'

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        // 없으면 페이지 리프레시됨
        event.preventDefault();

        console.log('email : ', Email)
        console.log('password : ', Password)

        let body = {
            email : Email,
            password : Password
        }
        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess){
                    props.history.push('/')
                } else{
                    alert('Error')
                }
            })
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

export default withRouter(LoginPage)
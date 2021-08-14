import React, {userEffect} from "react";
import axios from 'axios';


function RegisterPage() {

    userEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [])

    return (
        <div>
            RegisterPage1  
        </div>
    )
}

export default RegisterPage
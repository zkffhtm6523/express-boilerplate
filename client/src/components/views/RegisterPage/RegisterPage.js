import React, {userEffect} from "react";
import axios from 'axios';
import { response } from "express";

function RegisterPage() {

    userEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [])

    return (
        <div>
            RegisterPage
        </div>
    )
}

export default RegisterPage
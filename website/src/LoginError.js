import React from 'react'
import { Navigate } from 'react-router-dom';

export default function LoginError({validate}) {
    console.log(validate)
    if (validate[0] === "false") {
        return (<div>{"The username or password is incorrect."}</div>)
    }
}


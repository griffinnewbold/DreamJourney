import React from 'react'
import { Navigate } from 'react-router-dom';

export default function LoginError({validate}) {
    if (validate === "false") {
        return (<div>{"The username or password is incorrect."}</div>)
    }
}


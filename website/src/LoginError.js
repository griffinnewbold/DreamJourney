import React from 'react'

export default function LoginError({validate}) {
    if (validate == "false") {
        return (<div>{"The username or password is incorrect."}</div>)
    }
}

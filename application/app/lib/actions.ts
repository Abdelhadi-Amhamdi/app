'use server'

import { redirect } from "next/navigation"



const connectionPool = require('../../db')

// type User = {
//     id : string,
//     email : string,
//     username : string,
// }

export async function createUser(formData : FormData) {
    const rawFormData = {
        email : formData.get('email'),
        username : formData.get('username'),
        password : formData.get('password')
    }

    await connectionPool.query(`
        INSERT INTO users (email, name, password)
        VALUES ($1, $2, $3)
    `, [rawFormData.email, rawFormData.username, rawFormData.password])

    redirect('/auth/login');
}

export async function loguser(formData : FormData) {
    const rawFormData = {
        email : formData.get('email'),
        password : formData.get('password')
    }

    const user = await connectionPool.query(`
        SELECT * FROM users WHERE users.email = $1 AND users.password = $2
    `, [rawFormData.email, rawFormData.password])

    if(user.rows) {
        // create a jwt token and set cookies
        redirect('/dashboard')
    }
}
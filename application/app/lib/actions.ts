'use server'

import { redirect } from "next/navigation"
import jwt  from 'jsonwebtoken'
import { cookies } from "next/headers"

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

    const data = await connectionPool.query(`
        SELECT * FROM users WHERE users.email = $1 AND users.password = $2
    `, [rawFormData.email, rawFormData.password])


    if(data.rows.length > 0) {
        const user = data.rows[0]
        // create a jwt token and set cookies
        const token = jwt.sign(
            {id : user.id,},
            "secret",
            { expiresIn: '1h' }
        )
        
        ;(await cookies()).set('token', token, {
            httpOnly: true,
            maxAge : 60 * 60,
            path : '/',
            sameSite : 'strict'
        })
       redirect('/dashboard')
    }
}

export async function createOffer(formData : FormData) {
    const rawFormData = {
        type : formData.get('type'),
        title : formData.get('title'),
        description : formData.get('description')
    }

    const token = (await cookies()).get('token')
    const { id } = jwt.verify(token?.value, "secret")

    await connectionPool.query(`
        INSERT INTO offers (title, description, type, user_id, status)
        VALUES ($1, $2, $3, $4, $5)
    `, [rawFormData.title, rawFormData.description, rawFormData.type, id ,"open"])
    
    redirect('/dashboard/offers')
}
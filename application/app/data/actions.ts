'use server'

import { redirect } from "next/navigation"
import jwt  from 'jsonwebtoken'
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

const connectionPool = require('../../db')

export async function createUser(formData : FormData) {
    try {
        const rawFormData = {
            email : formData.get('email'),
            username : formData.get('username'),
            password : formData.get('password')
        }

    
        await connectionPool.query(`
            INSERT INTO users (email, name, password)
            VALUES ($1, $2, $3)
        `, [rawFormData.email, rawFormData.username, rawFormData.password])
    
    } catch (error) {
       
    }
    redirect('/auth/login');
}

export async function loguser(formData : FormData) {

    try {
        const rawFormData = {
            email : formData.get('email'),
            password : formData.get('password')
        }
    
        const data = await connectionPool.query(`
            SELECT * FROM users WHERE users.email = $1 AND users.password = $2
        `, [rawFormData.email, rawFormData.password])
    
    
        if(data.rows.length > 0) {
            const user = data.rows[0]
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
        } else {
            throw Error("invalid credinetials")
        }
    } catch(error) {
        
    }
    redirect('/dashboard')
}

export async function createOffer(formData : FormData) {
    try {
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
    } catch (error) {
        
    }
    
    revalidatePath('/dashboard/offers');
    redirect('/dashboard/offers')
}

export async function updateOffer(id : string, formData : FormData) {
    try {
        const rawFormData = {
            type : formData.get('type'),
            title : formData.get('title'),
            description : formData.get('description'),
            status : formData.get('status'),
        }
    
        await connectionPool.query(`
            UPDATE offers
            SET type = $1, title = $2, description  = $3, status = $5
            WHERE id = $4
        `, [rawFormData.type, rawFormData.title, rawFormData.description, id, rawFormData.status])
    } catch (error) {
        
    }

    revalidatePath('/dashboard/offers');
    redirect('/dashboard/offers')
}

export async function deleteOffer(id: string) {
    try {
        await connectionPool.query(`
            DELETE FROM offers WHERE id = $1
        `, [id])
    } catch(error) {
        
    }
    revalidatePath('/dashboard/offers');
}


export async function applyToOffer(offerid : string) {
    try {
        const token = (await cookies()).get('token')
        const { id } = jwt.verify(token?.value, "secret")
        
        await connectionPool.query(`
            INSERT INTO applicants (user_id, offer_id, status)
            VALUES ($1, $2, $3)
        `, [id ,offerid, "pending"])
    } catch(error) {
       
    }

    revalidatePath('/dashboard/jobs')
}


export async function cancelApplicant(app_id : string) {
    try {
        const token = (await cookies()).get('token')
        const { id } = jwt.verify(token?.value, "secret")
        
        await connectionPool.query(`
            DELETE FROM applicants WHERE id = $1 AND applicants.user_id = $2
        `, [app_id, id])

    } catch (error) {
        
    }

    revalidatePath('/dashboard')
}

export async function logout() {
    (await cookies()).delete('token')
    redirect('/auth/login')
}
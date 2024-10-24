import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'

const connectionPool = require('../../db') 

export async function fetchOffers() {
    try {
        const token = (await cookies()).get('token')
        const { id } = jwt.verify(token?.value, "secret")
        const data = await connectionPool.query(`
            SELECT * FROM offers WHERE user_id = $1
        `, [id])

        return data.rows
    } catch(err) {
        console.log(err);
        throw new Error('Failed to fetch offers data.');
    }
}

export async function serachOffers(query : string) {
    try {

        const data = await connectionPool.query(
            `SELECT * FROM offers WHERE offers.title ILIKE $1`, 
            [`%${query}%`]
          );
        return data.rows;
    } catch(err) {
        console.log(err);
        throw new Error('Failed to fetch offers data.');
    }
}

export async function fetchOfferById(id : string) {
        try {
            const data = await connectionPool.query(
                `SELECT * FROM offers WHERE offers.id = $1`, 
                [id]
            );
            return data.rows[0];
        } catch (err) {
            console.log(err);
        }
}

export async function fetchJobs() {
    try {
        const token = (await cookies()).get('token')
        const { id } = jwt.verify(token?.value, "secret")
        const data = await connectionPool.query(
            `SELECT offers.* 
            FROM offers 
            LEFT JOIN applicants ON offers.id = applicants.offer_id AND applicants.user_id = $1 
            WHERE offers.user_id != $1 AND applicants.id IS NULL`, [id]
          );
        return data.rows;
    } catch(err) {
        console.log(err);
        throw new Error('Failed to fetch offers data.');
    }
}

export async function searchJob(query : string) {
    try {

        const data = await connectionPool.query(
            `SELECT * FROM offers WHERE offers.title ILIKE $1 OR offers.type ILIKE $1 OR offers.description ILIKE $1`, 
            [`%${query}%`]
          );
        return data.rows;
    } catch(err) {
        console.log(err);
        throw new Error('Failed to fetch offers data.');
    }
}

export async function fetchApplicants() {
    try {
        const token = (await cookies()).get('token')
        const { id } = jwt.verify(token?.value, "secret")
        const data = await connectionPool.query(
            `SELECT 
            offers.*, applicants.id as applicant_id  FROM applicants 
            JOIN offers on applicants.offer_id = offers.id 
            WHERE applicants.user_id = $1`, 
            [id]
          );
        return data.rows;
    } catch(err) {
        console.log(err);
        throw new Error('Failed to fetch offers data.');
    }
}


export async function getMyStatus() {

    const token = (await cookies()).get('token')
    const { id } = jwt.verify(token?.value, "secret")
    try {
        const num_applicants = connectionPool.query(`
            SELECT COUNT(*) FROM applicants WHERE user_id = $1
        `, [id])
        const num_offers = connectionPool.query(`
            SELECT COUNT(*) FROM offers WHERE user_id = $1
        `, [id])
        const num_accepted = connectionPool.query(`
            SELECT COUNT(*) FROM offers WHERE user_id = $1 AND status = $2
        `, [id, "accepted"])
        const num_pending = connectionPool.query(`
            SELECT COUNT(*) FROM offers WHERE user_id = $1 AND status = $2
        `, [id, "pending"])

        const data = await Promise.all([
            num_applicants,
            num_offers,
            num_accepted,
            num_pending
        ])

        const applicants = Number(data[0].rows[0].count ?? '0')
        const offers = Number(data[1].rows[0].count ?? '0')
        const accepted = Number(data[2].rows[0].count ?? '0')
        const pending = Number(data[3].rows[0].count ?? '0')

       return {
        accepted,
        applicants,
        offers, 
        pending
       }
    } catch (err) {
        console.log(err)
    }
}

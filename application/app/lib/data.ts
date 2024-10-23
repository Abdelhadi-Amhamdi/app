const connectionPool = require('../../db') 

export async function fetchOffers() {
    try {
        const data = await connectionPool.query(`
            SELECT * FROM offers
        `)

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

export async function fetchJobs() {
    try {

        const data = await connectionPool.query(
            `SELECT * FROM offers `, 
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

        const data = await connectionPool.query(
            `SELECT offers.title, offers.type, offers.description, applicants.status FROM applicants JOIN offers on applicants.offer_id = offers.id`, 
          );
        return data.rows;
    } catch(err) {
        console.log(err);
        throw new Error('Failed to fetch offers data.');
    }
}


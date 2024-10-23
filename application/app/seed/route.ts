// import bcrypt from 'bcrypt';
const connection_Pool = require('../../db')


const users = [
    {
      id: '410544b2-4001-4271-9855-fec4b6a6442a',
      name: 'User',
      email: 'user@nextmail.com',
      password: '123456',
    },
  ];

const offers = [
  {
    id : "510544b2-4001-4271-9855-fec4b6a6442a",
    userid : "410544b2-4001-4271-9855-fec4b6a6442a",
    description : 'test',
    title : 'data sience',
    ststus : 'closed',
    type : 'fulltime'
  },

  
]

const applicants = [
 {
    id : "810544b2-4001-4271-9855-fec4b6a6442a",
    userid : "410544b2-4001-4271-9855-fec4b6a6442a",
    offerid : "510544b2-4001-4271-9855-fec4b6a6442a",
    status : 'pending',
  },
]


async function seedUsers() {
  await connection_Pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  await connection_Pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      return connection_Pool.query(`
        INSERT INTO users (id, name, email, password)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id) DO NOTHING;
      `, [user.id, user.name, user.email, user.password]);
    }),
  );

  return insertedUsers;
}

async function seedOffers() {
  await connection_Pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

  await connection_Pool.query(`
    CREATE TABLE IF NOT EXISTS offers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      description TEXT NOT NULL,
      status VARCHAR(255) NOT NULL,
      type VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

  const insertedOffers = await Promise.all(
    offers.map(
      async (offer) => connection_Pool.query(`
        INSERT INTO offers (id, user_id, description, title, status, type)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (id) DO NOTHING;
      `, [offer.id, offer.userid, offer.description, offer.title, offer.ststus, offer.type]),
    ),
  );

  return insertedOffers;
}

async function seedApplicants() {
  await connection_Pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

  await connection_Pool.query(`
    CREATE TABLE IF NOT EXISTS applicants (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      offer_id UUID NOT NULL,
      status VARCHAR(255) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (offer_id) REFERENCES offers(id)
    );
  `);

  const insertedApplicants = await Promise.all(
    applicants.map(
      (app) => connection_Pool.query(`
        INSERT INTO applicants (id, user_id, offer_id, status)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id) DO NOTHING;
      `, [app.id, app.userid, app.offerid, app.status]),
    ),
  );

  return insertedApplicants;
}


export async function GET() {

  try {
    await seedUsers();
    await seedApplicants()
    await seedOffers();
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

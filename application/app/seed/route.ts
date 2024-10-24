const connection_Pool = require('../../db')

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
}


export async function GET() {
  try {
    await seedUsers();
    await seedOffers();
    await seedApplicants()
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

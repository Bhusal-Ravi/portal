import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const { Pool } = pg

export const client = new Pool()

client.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('DB connection failed', err);
  } else {
    console.log('DB connected successfully');
  }
});

async function Migrate() {
  try {
    await client.query('BEGIN')

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
      )
    `)
    console.log('✓ users table')

    await client.query(`
      CREATE TABLE IF NOT EXISTS properties (
        id BIGSERIAL PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        location TEXT NOT NULL,
        image_url TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
      )
    `)
    console.log('✓ properties table')

    await client.query(`
      CREATE TABLE IF NOT EXISTS favourite (
        id BIGSERIAL PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        property_id BIGINT NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
        UNIQUE(user_id, property_id)
      )
    `)
    console.log('✓ favourite table')

    await client.query(`
      INSERT INTO users (id, name, email, password_hash)
      VALUES (
        'bb82a411-9cf2-49eb-ac85-7eb3c552d110',
        'JohnDoe',
        'JohnDoe@gmail.com',
        '$2a$12$.kKRkO7wm5F6FK0U9EBxS.FJgt49mjt4K1mdky9oouAsK5MqDsTmq'
      )
      ON CONFLICT (id) DO NOTHING
    `)
    console.log('✓ seed user')

    await client.query(`
      INSERT INTO properties (user_id, name, location, image_url)
      VALUES
        ('bb82a411-9cf2-49eb-ac85-7eb3c552d110', 'Property 21', 'Kathmandu',  'https://images.unsplash.com/photo-1664372623516-0b1540d6771e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('bb82a411-9cf2-49eb-ac85-7eb3c552d110', 'Property 22', 'Pokhara',    'https://images.unsplash.com/photo-1707499482789-9450160aaf83?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('bb82a411-9cf2-49eb-ac85-7eb3c552d110', 'Property 23', 'Lalitpur',   'https://images.unsplash.com/photo-1689939736254-5601f79ef838?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('bb82a411-9cf2-49eb-ac85-7eb3c552d110', 'Property 24', 'Bhaktapur',  'https://images.unsplash.com/photo-1647522891418-6fc021378011?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('bb82a411-9cf2-49eb-ac85-7eb3c552d110', 'Property 25', 'Chitwan',    'https://images.unsplash.com/photo-1633944241961-e511ab23455f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('bb82a411-9cf2-49eb-ac85-7eb3c552d110', 'Property 26', 'Butwal',     'https://images.unsplash.com/photo-1734770295023-2d0c7ee129e7?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('bb82a411-9cf2-49eb-ac85-7eb3c552d110', 'Property 27', 'Biratnagar', 'https://images.unsplash.com/photo-1633944241961-e511ab23455f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('bb82a411-9cf2-49eb-ac85-7eb3c552d110', 'Property 28', 'Dharan',     'https://images.unsplash.com/photo-1734770295023-2d0c7ee129e7?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('bb82a411-9cf2-49eb-ac85-7eb3c552d110', 'Property 29', 'Ilam',       'https://images.unsplash.com/photo-1650490587135-815f6fbf6e1e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('bb82a411-9cf2-49eb-ac85-7eb3c552d110', 'Property 30', 'Hetauda',    'https://images.unsplash.com/photo-1645351222405-4c1bee8cba3a?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('bb82a411-9cf2-49eb-ac85-7eb3c552d110', 'Property 31', 'Janakpur',   'https://images.unsplash.com/photo-1616141037618-d671075fd1a1?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('bb82a411-9cf2-49eb-ac85-7eb3c552d110', 'Property 32', 'Nepalgunj',  'https://images.unsplash.com/photo-1658843981492-8a150971ab28?q=80&w=1227&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('bb82a411-9cf2-49eb-ac85-7eb3c552d110', 'Property 33', 'Pokhara',    'https://images.unsplash.com/photo-1557746009-a8f8703e1e45?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('bb82a411-9cf2-49eb-ac85-7eb3c552d110', 'Property 34', 'Kathmandu',  'https://plus.unsplash.com/premium_photo-1664191866501-5e7ad9f07a1a?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('bb82a411-9cf2-49eb-ac85-7eb3c552d110', 'Property 35', 'Birgunj',    'https://images.unsplash.com/photo-1631458325834-8f678e48912c?q=80&w=1048&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
        ('bb82a411-9cf2-49eb-ac85-7eb3c552d110', 'Property 36', 'Dhangadhi',  'https://images.unsplash.com/photo-1647579350437-ed3307900d0d?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
      ON CONFLICT DO NOTHING
    `)
    console.log('✓ seed properties')

    await client.query('COMMIT')
    console.log('migration complete.')

  } catch (error) {
    await client.query('ROLLBACK')
    console.error('migration failed, rolled back.', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

Migrate()
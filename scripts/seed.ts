import 'dotenv/config';
import clientPromise from '../lib/mongodb';

async function seed() {
  const client = await clientPromise;
  const db = client.db('tshedybeauty');

  // Insert provider
  const provider = {
    name: 'Tshedy',
    email: process.env.EMAIL_USER || 'tshedy@example.com', // use real email from env
    phone: '+26612345678', // replace with real WhatsApp
    timezone: 'Africa/Maseru',
  };

  await db.collection('providers').insertOne(provider);

  // Insert services
  const services = [
    {
      name: 'Hair Cut',
      duration: 60,
      price: 150,
      description: 'Professional hair cut service',
    },
    {
      name: 'Manicure',
      duration: 45,
      price: 100,
      description: 'Nail care and manicure',
    },
    {
      name: 'Facial',
      duration: 90,
      price: 200,
      description: 'Skin care facial treatment',
    },
  ];

  await db.collection('services').insertMany(services);

  console.log('Seeded database');
  process.exit(0);
}

seed().catch(console.error);
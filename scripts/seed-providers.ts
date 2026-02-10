import 'dotenv/config';
import clientPromise from '../lib/mongodb';
import bcrypt from 'bcryptjs';

async function seedProviders() {
  const client = await clientPromise;
  const db = client.db('tshedybeauty');

  // Clear existing providers
  await db.collection('providers').deleteMany({});

  // Hash passwords
  const password1 = await bcrypt.hash('Mahloko@tbp#26658809665', 12);
  const password2 = await bcrypt.hash('Joel@tbp#26657650967', 12);

  // Insert providers
  const providers = [
    {
      name: 'Mamahloko Mahloko',
      email: 'mamahlokomahloko818@gmail.com',
      phone: '+26658809665',
      timezone: 'Africa/Maseru',
      password: password1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Kananelo Joel',
      email: 'kananeloj12@gmail.com',
      phone: '+26657650967',
      timezone: 'Africa/Maseru',
      password: password2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await db.collection('providers').insertMany(providers);

  console.log('✅ Seeded providers successfully');
  console.log('Provider 1: mamahlokomahloko818@gmail.com / Mahloko@tbp#26658809665');
  console.log('Provider 2: kananeloj12@gmail.com / Joel@tbp#26657650967');
  
  process.exit(0);
}

seedProviders().catch((error) => {
  console.error('Error seeding providers:', error);
  process.exit(1);
});

import 'dotenv/config';
import clientPromise from '../lib/mongodb';

async function seed() {
  const client = await clientPromise;
  const db = client.db('tshedybeauty');

  // Insert provider
  const provider = {
    name: 'Tshedy Beauty Parlour',
    email: process.env.EMAIL_USER || 'mamahlokomahlo818@gmail.com', // use real email from env
    phone: '+26658809665', // replace with real WhatsApp
    timezone: 'Africa/Maseru',
  };

  await db.collection('providers').insertOne(provider);

  // Insert services
  const services = [
    { name: 'Jumbo Braids', price: 150, category: 'Braids', description: 'Jumbo knotless braids for a trendy, voluminous style.' },
    { name: 'Small Boho Braids', price: 300, category: 'Braids', description: 'Small boho knotless braids with free-flowing curls for a bohemian vibe.' },
    { name: 'French Curls', price: 200, category: 'Curls', description: 'Bouncy French curls for a playful, elegant look.' },
    { name: 'Short Curled Braids', price: 280, category: 'Braids', description: 'Small knotless braids with beautiful curled ends for added flair.' },
    { name: 'Medium Curly Braids', price: 230, category: 'Braids', description: 'Medium curled knotless braids combining elegance with texture.' },
    { name: 'Gel Hairstyle', price: 100, category: 'Styling', description: 'Sleek gel styling for a polished, sophisticated look.' },
    { name: 'Bubble Braids', price: 180, category: 'Braids', description: 'Fun, trendy bubble braids with a playful, segmented finish.' },
    { name: 'Koroba Braids', price: 200, category: 'Braids', description: 'Bold koroba braids with intricate, statement-making patterns.' },
    { name: 'Extended Essence', price: 150, category: 'Cornrows', description: 'Extended essence cornrows with added length and volume for a fuller style.' },
    { name: 'Small Knotless Braids', price: 250, category: 'Braids', description: 'Sleek protective braids without tension, perfect for a natural look.' },
    { name: 'Mermaid Braids', price: 280, category: 'Braids', description: 'Flowing mermaid braids with a beautiful, wavy finish.' },
  ];

  await db.collection('services').insertMany(services);

  console.log('Seeded database');
  process.exit(0);
}

seed().catch(console.error);

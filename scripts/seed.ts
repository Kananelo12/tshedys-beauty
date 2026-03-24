import 'dotenv/config';
import clientPromise from '../lib/mongodb';

async function seed() {
  const client = await clientPromise;
  const db = client.db('tshedybeautyparlour');

  // Insert provider
  const provider = {
    name: 'Tshedy Beauty Parlour',
    email: process.env.EMAIL_USER || 'mamahlokomahlo818@gmail.com', // use real email from env
    phone: '+26658809665', // replace with real WhatsApp
    timezone: 'Africa/Maseru',
  };

  await db.collection('providers').insertOne(provider);

  // Insert services (all styles from gallery, duplicates differ by size)
  const services = [
    { name: 'Mermaid Braids (Large)', price: 580, category: 'Braids', description: 'Flowing large mermaid braids with a beautiful, wavy finish.' },
    { name: 'French Curls (Large)', price: 600, category: 'Curls', description: 'Bouncy large French curls for an elegant, voluminous look.' },
    { name: 'Medium Curly Braids', price: 480, category: 'Braids', description: 'Medium curled knotless braids combining elegance with texture.' },
    { name: 'Jumbo Braids', price: 380, category: 'Braids', description: 'Jumbo knotless braids for a trendy, voluminous style.' },
    { name: 'Small Knotless Braids (Short)', price: 580, category: 'Braids', description: 'Short-length small knotless braids, sleek and protective.' },
    { name: 'French Curls (Medium)', price: 450, category: 'Curls', description: 'Bouncy medium French curls for a playful, elegant look.' },
    { name: 'French Curls (Extra Large)', price: 650, category: 'Curls', description: 'Extra large French curls for a bold, statement-making style.' },
    { name: 'Bohemian Knotless', price: 650, category: 'Braids', description: 'Bohemian knotless braids with free-flowing curls for a boho vibe.' },
    { name: 'Small Knotless Braids (Medium)', price: 580, category: 'Braids', description: 'Medium-length small knotless braids for a natural, polished look.' },
    { name: 'Small Knotless Braids (Long)', price: 580, category: 'Braids', description: 'Long small knotless braids, sleek protective style with added length.' },
    { name: 'Short Curled Braids', price: 400, category: 'Braids', description: 'Small knotless braids with beautiful curled ends for added flair.' },
    { name: 'Mermaid Braids (Medium)', price: 480, category: 'Braids', description: 'Flowing medium mermaid braids with a wavy, elegant finish.' },
    { name: 'French Curls (Small)', price: 400, category: 'Curls', description: 'Bouncy small French curls for a subtle, playful look.' },
    { name: 'Gel Hairstyle', price: 200, category: 'Styling', description: 'Sleek gel styling for a polished, sophisticated look.' },
    { name: 'Bubble Braids', price: 350, category: 'Braids', description: 'Fun, trendy bubble braids with a playful, segmented finish.' },
    { name: 'Koroba Braids', price: 350, category: 'Braids', description: 'Bold koroba braids with intricate, statement-making patterns.' },
    { name: 'Extended Essence (Short)', price: 180, category: 'Cornrows', description: 'Short extended essence cornrows with added volume for a fuller style.' },
    { name: 'Extended Essence (Medium)', price: 180, category: 'Cornrows', description: 'Medium extended essence cornrows with added length and volume.' },
    { name: 'Braided 2 Ponytail Hairstyles', price: 200, category: 'Braids', description: 'Stylish braided double ponytail hairstyles for a fun, youthful look.' },
  ];

  await db.collection('services').insertMany(services);

  console.log('Seeded database');
  process.exit(0);
}

seed().catch(console.error);

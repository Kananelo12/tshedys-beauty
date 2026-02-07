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
    // Knotless Braids
    { name: 'Knotless Braids - Small', duration: 300, price: 250, description: 'Sleek protective braids without tension, perfect for a natural look.' },
    { name: 'Knotless Braids - Medium', duration: 240, price: 200, description: 'Medium-sized knotless braids for a comfortable, stylish protective hairstyle.' },
    { name: 'Knotless Braids - Large', duration: 180, price: 170, description: 'Large knotless braids for a bold, low-maintenance look.' },
    { name: 'Knotless Braids - Jumbo', duration: 150, price: 150, description: 'Jumbo knotless braids for a trendy, voluminous style.' },
    
    // Curled Knotless
    { name: 'Curled Knotless - Small', duration: 300, price: 280, description: 'Small knotless braids with beautiful curled ends for added flair.' },
    { name: 'Curled Knotless - Medium', duration: 240, price: 230, description: 'Medium curled knotless braids combining elegance with texture.' },
    { name: 'Curled Knotless - Large', duration: 210, price: 200, description: 'Large curled knotless braids for a glamorous protective style.' },
    { name: 'Curled Knotless - Jumbo', duration: 150, price: 180, description: 'Jumbo curled knotless braids for maximum volume and style.' },
    
    // Boho Knotless
    { name: 'Boho Knotless - Small', duration: 300, price: 300, description: 'Small boho knotless braids with free-flowing curls for a bohemian vibe.' },
    { name: 'Boho Knotless - Medium', duration: 240, price: 250, description: 'Medium boho knotless with artistic curls and texture.' },
    { name: 'Boho Knotless - Large', duration: 210, price: 220, description: 'Large boho knotless braids for an effortlessly chic look.' },
    { name: 'Boho Knotless - Jumbo', duration: 150, price: 200, description: 'Jumbo boho knotless for a bold bohemian statement.' },
    
    // Twist Braids
    { name: 'Twist Braids - Small', duration: 240, price: 300, description: 'Small twist braids for a refined, elegant protective style.' },
    { name: 'Twist Braids - Medium', duration: 180, price: 250, description: 'Medium twist braids offering versatility and style.' },
    { name: 'Twist Braids - Large', duration: 150, price: 200, description: 'Large twist braids for a classic, low-maintenance look.' },
    { name: 'Twist Braids - Jumbo', duration: 105, price: 150, description: 'Jumbo twist braids for a bold, trendy appearance.' },
    { name: 'Mini Twist (Hair)', duration: 210, price: 80, description: 'Delicate mini twists for a natural, textured look.' },
    
    // Curled Twist
    { name: 'Curled Twist - Small', duration: 240, price: 330, description: 'Small curled twists with beautiful bouncy ends.' },
    { name: 'Curled Twist - Medium', duration: 180, price: 280, description: 'Medium curled twists for a glamorous finish.' },
    { name: 'Curled Twist - Large', duration: 150, price: 230, description: 'Large curled twists combining volume and elegance.' },
    { name: 'Curled Twist - Jumbo', duration: 105, price: 180, description: 'Jumbo curled twists for maximum impact.' },
    { name: 'Mini Twist', duration: 210, price: 180, description: 'Delicate mini twists with curled ends.' },
    
    // Boho Twist
    { name: 'Boho Twist - Small', duration: 240, price: 350, description: 'Small boho twists with free-flowing curls for a carefree style.' },
    { name: 'Boho Twist - Medium', duration: 180, price: 300, description: 'Medium boho twists blending structure with natural flow.' },
    { name: 'Boho Twist - Large', duration: 150, price: 250, description: 'Large boho twists for an artistic, bohemian look.' },
    { name: 'Boho Twist - Jumbo', duration: 105, price: 200, description: 'Jumbo boho twists for a stunning statement style.' },
    
    // Dreadlocks
    { name: 'Eco-Dread', duration: 300, price: 170, description: 'Eco-friendly dreadlocs installation for a natural, authentic look.' },
    { name: 'Durban Dread', duration: 300, price: 170, description: 'Traditional Durban-style dreadlocs with expert finishing.' },
    { name: 'Butterfly Locs', duration: 300, price: 250, description: 'Trendy butterfly locs with a textured, distressed finish.' },
    { name: 'Faux Locs', duration: 300, price: 250, description: 'Temporary faux locs for the look without the commitment.' },
    
    // Gel/Lephondo
    { name: 'Bun', duration: 40, price: 100, description: 'Sleek gel bun for a polished, sophisticated look.' },
    { name: 'Braided Bun', duration: 55, price: 120, description: 'Elegant braided bun combining style and elegance.' },
    { name: 'Ponytail', duration: 40, price: 130, description: 'Sleek gel ponytail for a classic, chic style.' },
    { name: 'Braided Ponytail', duration: 55, price: 150, description: 'Beautiful braided ponytail with intricate detailing.' },
    
    // Essence/Cornrows
    { name: 'Backline', duration: 90, price: 70, description: 'Classic backline cornrows for a neat, timeless look.' },
    { name: 'Paff', duration: 105, price: 100, description: 'Stylish paff cornrows with a modern twist.' },
    { name: 'Extended Paff', duration: 150, price: 150, description: 'Extended paff cornrows with added length and volume.' },
    { name: 'Extended Backline', duration: 150, price: 120, description: 'Extended backline cornrows for a fuller, longer style.' },
    
    // Make-up
    { name: 'Soft Glam', duration: 45, price: 150, description: 'Natural, radiant makeup for everyday elegance.' },
    { name: 'Full Glam', duration: 60, price: 200, description: 'Complete glamorous makeup for special occasions.' },
    { name: 'Bridal Makeup', duration: 90, price: 300, description: 'Professional bridal makeup for your perfect wedding day.' },
    
    // Lashes
    { name: 'Lashes - Classic', duration: 60, price: 70, description: 'Classic lash extensions for natural enhancement.' },
    { name: 'Lashes - Hybrid', duration: 90, price: 100, description: 'Hybrid lash extensions combining classic and volume.' },
    { name: 'Lashes - Volume', duration: 120, price: 120, description: 'Full volume lash extensions for dramatic impact.' },
    
    // French Curls
    { name: 'Short French Curls', duration: 150, price: 200, description: 'Bouncy short French curls for a playful look.' },
    { name: 'Short Boho French', duration: 150, price: 250, description: 'Short boho French curls with a carefree vibe.' },
    { name: 'Long French Curls', duration: 210, price: 300, description: 'Long French curls for elegant, flowing waves.' },
    
    // Hair Wash & Extension
    { name: 'Natural Hair Wash', duration: 30, price: 40, description: 'Gentle wash and conditioning for natural hair.' },
    { name: 'Relaxed Hair Wash', duration: 30, price: 30, description: 'Specialized wash treatment for relaxed hair.' },
    { name: 'Sew-in Hair Extension', duration: 210, price: 150, description: 'Professional sew-in extensions for length and volume.' },
  ];

  await db.collection('services').insertMany(services);

  console.log('Seeded database');
  process.exit(0);
}

seed().catch(console.error);
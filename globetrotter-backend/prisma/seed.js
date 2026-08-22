const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function imageUrlFor(name) {
  return `https://source.unsplash.com/400x300/?${encodeURIComponent(name.toLowerCase())}`;
}

const citiesData = [
  { name: 'Tokyo', country: 'Japan', region: 'Asia', costIndex: 75, popularity: 95 },
  { name: 'Kyoto', country: 'Japan', region: 'Asia', costIndex: 65, popularity: 80 },
  { name: 'Bangkok', country: 'Thailand', region: 'Asia', costIndex: 35, popularity: 85 },
  { name: 'Bali', country: 'Indonesia', region: 'Asia', costIndex: 30, popularity: 90 },
  { name: 'Singapore', country: 'Singapore', region: 'Asia', costIndex: 80, popularity: 78 },
  { name: 'Paris', country: 'France', region: 'Europe', costIndex: 85, popularity: 98 },
  { name: 'Rome', country: 'Italy', region: 'Europe', costIndex: 70, popularity: 92 },
  { name: 'Barcelona', country: 'Spain', region: 'Europe', costIndex: 65, popularity: 88 },
  { name: 'London', country: 'United Kingdom', region: 'Europe', costIndex: 90, popularity: 93 },
  { name: 'Amsterdam', country: 'Netherlands', region: 'Europe', costIndex: 75, popularity: 82 },
  { name: 'Prague', country: 'Czech Republic', region: 'Europe', costIndex: 45, popularity: 76 },
  { name: 'Lisbon', country: 'Portugal', region: 'Europe', costIndex: 55, popularity: 79 },
  { name: 'Reykjavik', country: 'Iceland', region: 'Europe', costIndex: 88, popularity: 60 },
  { name: 'Istanbul', country: 'Turkey', region: 'Europe', costIndex: 40, popularity: 81 },
  { name: 'New York', country: 'United States', region: 'North America', costIndex: 92, popularity: 96 },
  { name: 'Toronto', country: 'Canada', region: 'North America', costIndex: 70, popularity: 68 },
  { name: 'Rio de Janeiro', country: 'Brazil', region: 'South America', costIndex: 50, popularity: 77 },
  { name: 'Dubai', country: 'United Arab Emirates', region: 'Middle East', costIndex: 78, popularity: 84 },
  { name: 'Cape Town', country: 'South Africa', region: 'Africa', costIndex: 42, popularity: 74 },
  { name: 'Marrakech', country: 'Morocco', region: 'Africa', costIndex: 35, popularity: 70 },
  { name: 'Sydney', country: 'Australia', region: 'Oceania', costIndex: 82, popularity: 86 },
];

function buildActivitiesForCity(cityName, cityId) {
  const templates = [
    { suffix: 'Walking Tour', category: 'sightseeing', cost: 20, duration: '2 hours', description: `A guided walking tour through the historic streets of ${cityName}.` },
    { suffix: 'Street Food Crawl', category: 'food', cost: 35, duration: '3 hours', description: `Sample local delicacies on a curated street food tour of ${cityName}.` },
    { suffix: 'Fine Dining Experience', category: 'food', cost: 120, duration: '2 hours', description: `An upscale dining experience showcasing the best of ${cityName}'s cuisine.` },
    { suffix: 'Adventure Excursion', category: 'adventure', cost: 95, duration: 'half day', description: `An adrenaline-filled adventure activity just outside ${cityName}.` },
    { suffix: 'Spa & Wellness Retreat', category: 'relaxation', cost: 80, duration: '3 hours', description: `Unwind with a relaxing spa treatment in the heart of ${cityName}.` },
    { suffix: 'Museum & Heritage Tour', category: 'culture', cost: 25, duration: '3 hours', description: `Explore the rich cultural heritage and museums of ${cityName}.` },
    { suffix: 'Rooftop Nightlife Tour', category: 'nightlife', cost: 60, duration: '4 hours', description: `Experience the vibrant nightlife scene across ${cityName}'s best rooftop bars.` },
    { suffix: 'Private Guided Landmark Tour', category: 'sightseeing', cost: 150, duration: 'full day', description: `A private, in-depth tour of ${cityName}'s most iconic landmarks.` },
  ];

  return templates.map((t) => ({
    cityId,
    name: `${cityName} ${t.suffix}`,
    category: t.category,
    cost: t.cost,
    duration: t.duration,
    description: t.description,
    imageUrl: imageUrlFor(`${cityName} ${t.suffix}`),
  }));
}

async function main() {
  console.log('Clearing existing Activity and City rows...');
  await prisma.activity.deleteMany();
  await prisma.city.deleteMany();

  console.log('Seeding cities...');
  const createdCities = [];
  for (const city of citiesData) {
    const created = await prisma.city.create({
      data: {
        name: city.name,
        country: city.country,
        region: city.region,
        costIndex: city.costIndex,
        popularity: city.popularity,
        imageUrl: imageUrlFor(city.name),
      },
    });
    createdCities.push(created);
  }
  console.log(`Seeded ${createdCities.length} cities`);

  console.log('Seeding activities...');
  let activityCount = 0;
  for (const city of createdCities) {
    const activities = buildActivitiesForCity(city.name, city.id);
    for (const activity of activities) {
      await prisma.activity.create({ data: activity });
      activityCount += 1;
    }
  }
  console.log(`Seeded ${activityCount} activities`);
}

main()
  .catch((err) => {
    console.error('Seed script failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
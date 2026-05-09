import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create mock user
  const user = await prisma.user.upsert({
    where: { email: 'reader@inkshelf.com' },
    update: {},
    create: {
      email: 'reader@inkshelf.com',
      name: 'Reader',
      password: 'password123', // Just a mock
    },
  });

  // Create books
  const booksData = [
    {
      title: 'Tintin in America',
      author: 'Herge',
      description: 'Tintin and Snowy travel to the United States and get tangled up with gangsters in Chicago.',
      coverImage: '/Tintin in America.jpg',
      genres: 'Adventure,Comic',
      isTrending: true,
      price: 1299,
      rating: 4.8,
      reviewCount: 342,
    },
    {
      title: 'Uzumaki',
      author: 'Junji Ito',
      description: 'A masterpiece of horror manga focusing on a town plagued by spirals.',
      coverImage: '/Uzumaki.jpg',
      genres: 'Action,Samurai,Horror',
      isTrending: true,
      price: 999,
      rating: 4.5,
      reviewCount: 128,
    },
    {
      title: 'Jujutsu Kaisen (Vol 1)',
      author: 'Gege Akutami',
      description: 'A gripping tale of curses and sorcery in modern-day Japan.',
      coverImage: '/Jujutsu Kaisen (Vol 1).jpg',
      genres: 'Fantasy,Mystery,Action',
      isStaffPick: true,
      price: 1499,
      rating: 4.9,
      reviewCount: 512,
    },
    {
      title: 'Your Name (Vol 1)',
      author: 'Makoto Shinkai',
      description: 'A beautiful story of two people connected by a comet and dreams.',
      coverImage: '/Your Name (Vol 1).jpg',
      genres: 'Slice of Life,Romance',
      isTrending: true,
      price: 599,
      rating: 4.2,
      reviewCount: 89,
    },
    {
      title: 'Tintin and the Picaros',
      author: 'Herge',
      description: 'Tintin, Captain Haddock, and Professor Calculus return to San Theodoros to rescue their friends.',
      coverImage: '/Tintin and the Picaros.jpg',
      genres: 'Adventure,Comic',
      isTrending: true,
      price: 1099,
      rating: 4.6,
      reviewCount: 201,
    }
  ];

  for (const b of booksData) {
    const book = await prisma.book.create({
      data: {
        ...b,
        chapters: {
          create: Array.from({ length: 10 }).map((_, i) => ({
            chapterNo: i + 1,
            title: `Chapter ${i + 1}`,
          })),
        },
      },
    });

    // Create reading progress for first 3 books
    if (booksData.indexOf(b) < 3) {
      await prisma.readingProgress.create({
        data: {
          userId: user.id,
          bookId: book.id,
          chapterNo: Math.floor(Math.random() * 9) + 1,
        },
      });
    }
  }

  console.log('Database seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

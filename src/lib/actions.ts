'use server';

import { prisma } from './db';
import { cookies } from 'next/headers';

// Utility to get current user ID (mocked)
export async function getCurrentUserId() {
  const cookieStore = cookies();
  const userIdCookie = cookieStore.get('userId');
  
  if (userIdCookie?.value) {
    return userIdCookie.value;
  }

  // Fallback to the default reader if no cookie is set
  const defaultUser = await prisma.user.findFirst({
    where: { email: 'reader@inkshelf.com' }
  });
  
  return defaultUser?.id || null;
}

export async function getTrendingBooks() {
  return prisma.book.findMany({
    where: { isTrending: true },
    take: 4,
  });
}

export async function getStaffPicks() {
  return prisma.book.findMany({
    where: { isStaffPick: true },
    take: 1,
  });
}

export async function getBookById(id: string) {
  return prisma.book.findUnique({
    where: { id },
    include: {
      chapters: {
        orderBy: { chapterNo: 'asc' }
      }
    }
  });
}

export async function getUserProgress(userId: string) {
  return prisma.readingProgress.findMany({
    where: { userId },
    include: {
      book: true,
    },
    take: 4,
  });
}

export async function getAllBooks(query?: string) {
  const books = await prisma.book.findMany();
  if (query) {
    const lowerQuery = query.toLowerCase();
    return books.filter(b => 
      b.title.toLowerCase().includes(lowerQuery) || 
      b.author.toLowerCase().includes(lowerQuery) || 
      b.genres.toLowerCase().includes(lowerQuery)
    );
  }
  return books;
}

export async function getMoreLikeThis(excludeId: string) {
  return prisma.book.findMany({
    where: {
      id: { not: excludeId }
    },
    take: 4,
  });
}

export async function loginUser(email: string) {
  let user = await prisma.user.findFirst({
    where: { email }
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name: email.split('@')[0],
      }
    });
  }

  const cookieStore = cookies();
  cookieStore.set('userId', user.id, { httpOnly: true, path: '/' });
  return { success: true };
}

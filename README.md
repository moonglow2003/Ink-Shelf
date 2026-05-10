# 📚 InkShelf
🌐 Live Demo: https://ink-shelf4.vercel.app/

### *Comics, manga, and pages you won’t forget.*

InkShelf is a modern comic and manga bookstore built for readers who love immersive stories, clean design, and smooth user experiences. From indie comics to popular manga collections, InkShelf lets users explore, discover, and organize books inside a playful black-and-white reading universe.


---

## ✨ Features

### 📖 Explore & Discover

* Browse a curated collection of comics, manga, and graphic novels
* Search books by title, genre, or author
* Discover trending releases and personalized recommendations


### 🤖 AI Reading Assistant

* Built-in AI chatbot powered by Groq’s ultra-fast `llama-3.1-8b-instant`
* Get book recommendations
* Discover similar titles
* Ask questions about genres, authors, or stories

### 🎨 Comic-Inspired UI

* Minimal black-and-white neo-brutalist design
* Manga-style borders, halftone shadows, and smooth animations
* Fully responsive across desktop, tablet, and mobile

### 🔐 Authentication System

* Custom login and sign-up flow
* Persistent user sessions
* Personalized reading experience

---

## 🛠 Tech Stack

| Technology        | Purpose                    |
| ----------------- | -------------------------- |
| Next.js 14        | Full-stack React framework |
| Tailwind CSS      | Styling and responsive UI  |
| Prisma            | Database ORM               |
| PostgreSQL + Neon | Serverless database        |
| Groq API          | AI chatbot integration     |
| Vercel            | Deployment and hosting     |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/moonglow2003/Ink-Shelf.git
cd Ink-Shelf
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@host/database"

GROQ_API_KEY="gsk_your_api_key_here"
```

---

## 🗄 Database Setup

Generate the Prisma client:

```bash
npx prisma generate
```

Push the schema to your database:

```bash
npx prisma db push
```

(Optional) Seed the database with initial comic data:

```bash
npx prisma db seed
```

---

## 💻 Run Locally

Start the development server:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

in your browser to view InkShelf.

---

## ☁️ Deployment

InkShelf is optimized for deployment on Vercel.

### Deploy Steps

1. Import the repository into Vercel
2. Add the required environment variables:

   * `DATABASE_URL`
   * `GROQ_API_KEY`
3. Deploy the project

Prisma client generation is automatically handled during build.

---

## 📂 Project Goals

InkShelf was designed to explore:

* modern UI/UX systems
* AI-assisted user experiences
* interactive frontend animations
* scalable full-stack architecture
* clean state management patterns

while creating a reading platform that feels fun, minimal, and visually unique.

---

## 📜 License

This project is licensed under the MIT License.

---



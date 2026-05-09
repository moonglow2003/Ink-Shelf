'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/actions';

export default function Login() {
  const [email, setEmail] = useState('reader@inkshelf.com');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(email);
      router.push('/home');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-gutter">
      {/* Login/Signup Container */}
      <main className="w-full max-w-4xl bg-surface comic-border comic-shadow flex flex-col md:flex-row h-[800px] md:h-[600px] overflow-hidden">
        {/* Illustration Side */}
        <section className="hidden md:flex md:w-1/2 bg-surface-variant relative p-lg flex-col justify-center items-center border-b-2 md:border-b-0 md:border-r-2 border-primary">
          {/* Halftone divider element */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "10px 10px" }}></div>
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center">
            <h1 className="font-display-lg text-display-lg text-primary mb-md">Get Lost<br/>in the Ink.</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-sm mb-xl">Your personal library of indie comics and manga awaits.</p>
            {/* Comic Illustration Placeholder */}
            <div className="w-64 h-64 comic-border bg-surface p-sm comic-shadow transform -rotate-3">
              <img alt="Illustration of a person reading a book" className="w-full h-full object-cover grayscale comic-border" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv0ZBbGF0L03P7AFzKUpWHk1rF__gt5wJEdkQYUMH4jNqt-cHiZtn4E7NYqwKN9THJYSZDox4FjFrEdnWUU-C6fqsT-83wal9sCRi2yvXckeX4Z6yRKkuma-E-YgzPmonX8AF5W0gCpPHrXzNZVJXH4PeOnecF-yAX0yK4Gxhh5JaI71iEzjRmtSkRxLpXoD7jXu8y91ryogRTX4kUd63dp-5Rhv1cMsE_zL4uysiNrMqkTB-4HXr4T7GBDhMZ3ZrDXqvCVwb-q7U"/>
            </div>
          </div>
        </section>

        {/* Form Side */}
        <section className="w-full md:w-1/2 p-lg lg:p-xl flex flex-col bg-surface z-10">
          {/* Brand / Logo area */}
          <div className="flex items-center gap-sm mb-xl">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '32px', fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
            <span className="font-headline-lg text-headline-lg font-extrabold tracking-tighter text-primary">INKSHELF</span>
          </div>

          {/* Toggle (Login / Sign Up) */}
          <div className="flex gap-md mb-lg border-b-2 border-surface-variant pb-xs">
            <button className="font-headline-md text-headline-md text-primary font-bold border-b-4 border-primary px-xs">Log In</button>
            <button className="font-headline-md text-headline-md text-secondary hover:text-primary transition-colors px-xs">Sign Up</button>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-lg flex-grow" onSubmit={handleLogin}>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="email">Email Address</label>
              <input 
                className="input-minimal w-full font-body-md text-body-md text-on-surface py-xs border-b border-primary focus:outline-none" 
                id="email" 
                placeholder="reader@inkshelf.com" 
                required 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-xs">
              <div className="flex justify-between items-center">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="password">Password</label>
                <a className="font-label-md text-label-md text-secondary hover:text-primary underline decoration-2 underline-offset-2" href="#">Forgot?</a>
              </div>
              <input className="input-minimal w-full font-body-md text-body-md text-on-surface py-xs border-b border-primary focus:outline-none" id="password" placeholder="••••••••" required type="password" defaultValue="password" />
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-md bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider comic-border comic-shadow comic-button-hover mt-md transition-all flex items-center justify-center disabled:opacity-50"
            >
              {loading ? 'Entering...' : 'Enter the Shelf'}
            </button>
          </form>

          {/* Social Login Divider */}
          <div className="flex items-center gap-sm my-lg">
            <div className="flex-grow border-t-2 border-surface-variant"></div>
            <span className="font-label-md text-label-md text-secondary">OR CONTINUE WITH</span>
            <div className="flex-grow border-t-2 border-surface-variant"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-md">
            <button className="flex-1 py-sm flex justify-center items-center gap-sm bg-surface comic-border hover:bg-surface-container-highest transition-colors comic-shadow comic-button-hover">
              <span className="font-label-md text-label-md text-primary uppercase">Google</span>
            </button>
            <button className="flex-1 py-sm flex justify-center items-center gap-sm bg-surface comic-border hover:bg-surface-container-highest transition-colors comic-shadow comic-button-hover">
              <span className="font-label-md text-label-md text-primary uppercase">Apple</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

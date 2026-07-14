import Link from 'next/link';
import { inter } from '../lib/fonts';

export default function NotFound() {
  return (
    <div className='min-h-[60vh] flex flex-col items-center justify-center px-6 text-center'>
      <h1 className={`text-6xl font-bold text-primary mb-4 ${inter.className}`}>404</h1>
      <p className={`text-xl text-text mb-2 ${inter.className}`}>Page not found</p>
      <p className={`text-text-muted mb-8 ${inter.className}`}>The page you are looking for does not exist.</p>
      <Link
        href='/lt'
        className={`px-6 py-2.5 bg-primary text-white text-sm font-medium uppercase tracking-wider hover:bg-primary-dark transition-colors ${inter.className}`}
      >
        Pradžia
      </Link>
    </div>
  );
}

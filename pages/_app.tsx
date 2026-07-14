import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import type { AppProps } from 'next/app';
import { inter } from '../lib/fonts';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`relative min-h-screen ${inter.variable}`}>
      <div className='absolute inset-0 -z-10 bg-white' aria-hidden='true' />
      <div className='relative z-10'>
        <Header />
        <main className='min-h-screen relative'>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </div>
  );
}

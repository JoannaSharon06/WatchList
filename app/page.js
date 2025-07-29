'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.hero}>
        <Image
          className={styles.logo}
          src="/watch.png"
          alt="Watchlist Logo"
          width={100}
          height={100}
          priority
        />

        <h1 className={styles.title}>🎬 Watchlist Organiser</h1>
        <p className={styles.subtitle}>
          Create your personal movie & show watchlist. Discover, Filter & Track in style.
        </p>

        <div className={styles.actions}>
          <Link href="/signup" className={styles.btnPrimary}>
            Sign Up
          </Link>
          <Link href="/login" className={styles.btnSecondary}>
            Login
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} Watchlist Organiser 
      </footer>
    </div>
  );
}

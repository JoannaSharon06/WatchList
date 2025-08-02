'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();

    if (form.email === 'admin@watchlist.com' && form.password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      alert('Admin login successful!');
      router.push('/admin-dashboard');
      return;
    }

    const user = JSON.parse(localStorage.getItem(form.email));
    if (user && user.password === form.password) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('currentUser', form.email);
      localStorage.setItem('isAdmin', 'false');
      alert('Login Successful!');
      router.push('/dashboard');
    } else {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleLogin} className={styles.authForm}>
        <h2 className={styles.authTitle}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          className={styles.authInput}
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.authInput}
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className={styles.authButton}>Login</button>
        <p className={styles.loginLink}>
          Don&apos;t have an account? <Link href="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

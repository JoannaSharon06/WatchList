'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './signup.module.css';

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(form.email, JSON.stringify(form));
    alert('Signup successful!');
    router.push('/login');
  };

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2>Signup</h2>
        <input
          type="text"
          placeholder="Username"
          required
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Create Account</button>

        <p className={styles.loginLink}>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

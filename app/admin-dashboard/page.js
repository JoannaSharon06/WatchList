'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const router = useRouter();
  const [movie, setMovie] = useState({
    title: '',
    release_date: '',
    poster_url: '',
    genre: '',
    language: ''
  });
  const [adminMovies, setAdminMovies] = useState([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      alert('Unauthorized access');
      router.push('/login');
    }

    const saved = JSON.parse(localStorage.getItem('admin-movies')) || [];
    setAdminMovies(saved);
  }, [router]);

  const handleAddMovie = (e) => {
    e.preventDefault();

    const updated = [...adminMovies, movie];
    localStorage.setItem('admin-movies', JSON.stringify(updated));
    setAdminMovies(updated);

    setMovie({
      title: '',
      release_date: '',
      poster_url: '',
      genre: '',
      language: ''
    });

    alert('Movie added successfully!');
  };

  const handleDeleteMovie = (indexToDelete) => {
    const updated = adminMovies.filter((_, index) => index !== indexToDelete);
    localStorage.setItem('admin-movies', JSON.stringify(updated));
    setAdminMovies(updated);
    alert('Movie deleted.');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Admin Dashboard</h1>

      <form className={styles.form} onSubmit={handleAddMovie}>
        <input
          type="text"
          placeholder="Movie Title"
          required
          className={styles.input}
          value={movie.title}
          onChange={(e) => setMovie({ ...movie, title: e.target.value })}
        />
        <input
          type="date"
          placeholder="Release Date"
          required
          className={styles.input}
          value={movie.release_date}
          onChange={(e) => setMovie({ ...movie, release_date: e.target.value })}
        />
        <input
          type="url"
          placeholder="Poster Image URL"
          required
          className={styles.input}
          value={movie.poster_url}
          onChange={(e) => setMovie({ ...movie, poster_url: e.target.value })}
        />
        <select
          required
          className={styles.input}
          value={movie.genre}
          onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
        >
          <option value="">--Select Genre--</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Romance">Romance</option>
          <option value="Horror">Horror</option>
        </select>
        <select
          required
          className={styles.input}
          value={movie.language}
          onChange={(e) => setMovie({ ...movie, language: e.target.value })}
        >
          <option value="">--Select Language--</option>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="ja">Japanese</option>
          <option value="es">Spanish</option>
          <option value="tm">Tamil</option>
        </select>
        <input
          type="url"
          placeholder="Movie URL"
          className={styles.input}
          value={movie.trailer_url}
          onChange={(e) => setMovie({ ...movie, trailer_url: e.target.value })}
        />
        <button type="submit" className={styles.button}>Add Movie</button>
      </form>

      <h2 className={styles.subheading}> Movies Added by Admin</h2>
      <ul className={styles.movieList}>
        {adminMovies.length === 0 ? (
          <p>No movies added yet.</p>
        ) : (
          adminMovies.map((m, i) => (
            <li key={i} className={styles.movieCard}>
              <h3 className={styles.movieTitle}>{m.title}</h3>
              <p className={styles.movieDate}>Release: {m.release_date}</p>
              <Image src={m.poster_url} alt={m.title} width={100} height={150} />
              <p><b>Genre:</b> {m.genre}</p>
              <p><b>Language:</b> {m.language}</p>
              <button
                onClick={() => handleDeleteMovie(i)}
                className={styles.deleteBtn}
              >
               Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

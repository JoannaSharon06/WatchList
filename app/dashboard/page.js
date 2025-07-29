'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './dashboard.module.css';

export default function Dashboard() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [email, setEmail] = useState('');
  const [viewingWatchlist, setViewingWatchlist] = useState(false);

  useEffect(() => {
    const adminMovies = JSON.parse(localStorage.getItem('admin-movies')) || [];

    const adminWithIds = adminMovies.map((m, i) => ({
      ...m,
      id: `admin-${i}`,
    }));

    setAllMovies(adminWithIds);
    setMovies(adminWithIds);

    const currentEmail = localStorage.getItem('currentUser');
    setEmail(currentEmail);
    const saved = JSON.parse(localStorage.getItem(`${currentEmail}-watchlist`)) || [];
    setWatchlist(saved);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!genre || !language) {
      alert('Please select both genre and language');
      return;
    }

    const filtered = allMovies.filter(
      (movie) => movie.genre === genre && movie.language === language
    );
    setMovies(filtered);
    setViewingWatchlist(false);
  };

  const handleAddToWatchlist = (movie) => {
    if (!email) {
      alert('Please login to add to your watchlist.');
      return;
    }

    const already = watchlist.some((item) => item.id === movie.id);
    if (already) {
      alert('Already in your watchlist.');
      return;
    }

    const updated = [...watchlist, movie];
    setWatchlist(updated);
    localStorage.setItem(`${email}-watchlist`, JSON.stringify(updated));
    alert('Added to watchlist');
  };

  const handleDeleteFromWatchlist = (id) => {
    const updated = watchlist.filter((m) => m.id !== id);
    setWatchlist(updated);
    localStorage.setItem(`${email}-watchlist`, JSON.stringify(updated));
    alert('Removed from watchlist');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/login');
  };

  const displayedList = viewingWatchlist ? watchlist : movies;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
  <h1 className={styles.title}>🎬 Movies Dashboard</h1>
  <button onClick={handleLogout} className={styles.logoutBtn}>🚪 Logout</button>
</div>


      <form className={styles.form} onSubmit={handleSubmit}>
        <select value={genre} onChange={(e) => setGenre(e.target.value)} required>
          <option value="">--Genre--</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Romance">Romance</option>
          <option value="Horror">Horror</option>
        </select>

        <select value={language} onChange={(e) => setLanguage(e.target.value)} required>
          <option value="">--Language--</option>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="ja">Japanese</option>
          <option value="es">Spanish</option>
          <option value="tm">Tamil</option>
        </select>

        <button type="submit">Apply Filter</button>
        <button
          type="button"
          onClick={() => setViewingWatchlist(!viewingWatchlist)}
          className={styles.toggleBtn}
        >
          {viewingWatchlist ? '🔍 Discover Movies' : '🎞️ View Watchlist'}
        </button>
      </form>

      <ul className={styles.movieList}>
        {displayedList.length === 0 ? (
          <p>{viewingWatchlist ? 'Your watchlist is empty.' : 'No movies found.'}</p>
        ) : (
          displayedList.map((movie) => (
            <li key={movie.id} className={styles.movieCard}>
              <h3>{movie.title}</h3>
              <p>Release Date: {movie.release_date}</p>
              {movie.poster_url && (
                <Image
                  src={movie.poster_url}
                  alt={movie.title}
                  width={120}
                  height={180}
                  style={{ borderRadius: '8px' }}
                />
              )}

              {viewingWatchlist ? (
                <div className={styles.watchlistActions}>
                  <button
                    onClick={() => handleDeleteFromWatchlist(movie.id)}
                    className={styles.deleteBtn}
                  >
                    🗑️ Delete
                  </button>
                  {movie.trailer_url && (
                    <button
                      onClick={() => window.open(movie.trailer_url, '_blank')}
                      className={styles.trailerBtn}
                    >
                      ▶️ Watch Trailer
                    </button>
                  )}
                </div>
              ) : (
                <div className={styles.actions}>
                  <button
                    onClick={() => handleAddToWatchlist(movie)}
                    className={styles.addBtn}
                  >
                    ➕ Add to Watchlist
                  </button>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

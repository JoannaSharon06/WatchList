import Link from "next/link";
import styles from './watchlist.module.css';  

const Watchlist = () => {
  const shows = [
    { id: '1', name: 'Breaking Bad', description: 'A high school chemistry teacher turned meth kingpin.' },
    { id: '2', name: 'Stranger Things', description: 'Kids uncover supernatural secrets in a small town.' },
    { id: '3', name: 'The Crown', description: 'Dramatized history of Queen Elizabeth II’s reign.' },
    { id: '4', name: 'Dark', description: 'A time-travel mystery in a German town.' },
    { id: '5', name: 'Money Heist', description: 'A criminal mastermind plans a perfect robbery.' },
  ];

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>My Watchlist</h1>
      <ul className={styles.list}>
        {shows.map((item) => (
          <li key={item.id} className={styles.card}>
            <Link href={`/watchlist/${item.id}`}>
              <p>{item.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;

'use client';
import { useParams } from 'next/navigation';

export default function WatchPage() {
  const { id } = useParams();

  return (
    <div style={{ padding: '40px', color: 'white' }}>
      <h1>🎬 Now Watching: {id}</h1>
      <p>This is where you can embed the player or trailer for the movie.</p>
    </div>
  );
}

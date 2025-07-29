import './watch.module.css'

const data = {
  1: {
    id: '1',
    name: 'Breaking Bad',
    description: 'A high school chemistry teacher turned meth kingpin.',
  },
  2: {
    id: '2',
    name: 'Stranger Things',
    description: 'Kids uncover supernatural secrets in a small town.',
  },
  3: {
    id: '3',
    name: 'The Crown',
    description: 'Dramatized history of Queen Elizabeth II’s reign.',
  },
  4: {
    id: '4',
    name: 'Dark',
    description: 'A time-travel mystery in a German town.',
  },
  5: {
    id: '5',
    name: 'Money Heist',
    description: 'A criminal mastermind plans a perfect robbery.',
  },
};

const ShowDetails = ({ params }) => {
  const show = data[params.id];
  if (!show) {
    return (
      <div className="bloog">
        <h1>Show Not Found</h1>
        <p>The requested show does not exist.</p>
      </div>
    );
  }
 
return (
  <div className="bloog">
    <h1>{show.name}</h1>
    <img src={`/${params.id}.jpg`} alt={show.name} />
    <p>{show.description}</p>
  </div>
);
};

export default ShowDetails;

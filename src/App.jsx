import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://lanciweb.github.io/demo/api/actors/');
        setActors(response.data/*.slice(0, 10)*/);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container py-4">
      <h1 className="mb-4">React Actors from API</h1>

      <div className="row">
        {actors.map(actor => (
          <div key={actor.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={actor.image} className="card-img-top" alt={actor.name} />
              <div className="card-body">
                <h5 className="card-title">{actor.name} {actor.surname}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Born: {actor.birth_year}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Death: {actor.death_year ?? 'Immortal'}</h6>
                <p className="card-text">
                  <strong>Nationality:</strong> {actor.nationality}<br />
                  <strong>Awards:</strong> {actor.awards ? actor.awards.join(', ') : 'No awards listed'}<br />
                  <strong>Movies:</strong> {actor.known_for ? actor.known_for.join(', ') : 'No movies listed'}
                </p>
              </div>
              <div className="card-footer">
                <small className="text-muted">
                  Bio: {actor.biography}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
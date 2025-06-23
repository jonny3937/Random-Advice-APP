import { useState, useEffect } from 'react';
import { PacmanLoader } from 'react-spinners';
import './App.css';

function App() {
  const [advice, setAdvice] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      if (!response.ok) {
        setError('Something went wrong');
        return;
      }
      const data = await response.json();
      setAdvice(data.slip.advice);
      setError(null);
    } catch (err) {
      setError('Failed to fetch advice');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="btn">
      <h1>Words of Wisdom</h1>
      {loading ? (
        <PacmanLoader className="loader" />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>{advice}</p>
      )}
      <button onClick={fetchAdvice} disabled={loading}>
        {loading ? 'Loading...' : 'Get Advice'}
      </button>
    </div>
  );
}

export default App;

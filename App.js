import React, { useState, useEffect } from 'react';
import NewsGrid from './NewsGrid';
import Menu from './Menu';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(1);
  const [category, setCategory] = useState('general');

  useEffect(() => {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=23faac28521143e1af415aa568ed5fa6`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.articles);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="App">
      <h1 className="title">See the latest news</h1>
      <Menu active={active} setActive={setActive} setCategory={setCategory} />
      {items && items.length > 0 ? <NewsGrid items={items} /> : <p>No news available</p>}
    </div>
  );
}

export default App;

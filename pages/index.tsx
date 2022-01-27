import { FormEvent, useState } from 'react'
import { SearchResults } from '../components/SearchResults';
import styles from '../styles/Home.module.css'

const Home = () => {
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState([]);

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();
    setResults(data);
  }

  return (
    <div className={styles.container}>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">Buscar</button>
      </form>
      
      <SearchResults results={results} />
    </div>

  )
}

export default Home

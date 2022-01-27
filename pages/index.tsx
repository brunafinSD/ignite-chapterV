import { FormEvent, useCallback, useState } from 'react'
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

  const addToWishList = useCallback(async (id: number) => {
    console.log(id);
  }, []);

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

      <SearchResults
        results={results}
        onAddToWishList={addToWishList}
      />
    </div>

  )
}

export default Home

// Toda vez que um componente renderiza novamente, suas funções são recriadas ocupando um novo espaço na memória
// Quando criamos uma função no pai e passamos para o filho, no filho ela será recriada na memória

// useCallback: memorizar uma função
// USAR QUANDO:
/*
  1- temos uma função no pai e precisamos passar para o filho / contexto
*/ 
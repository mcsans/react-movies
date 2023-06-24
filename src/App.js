import { useEffect, useState } from 'react';
import './App.css';
import { getMovieList, searchMovie } from './api';

const App = () => {
  
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result)
    }) 
  }, [])

  const search = async (keyword) => {
    if(keyword.length > 3) {
      const query = await searchMovie(keyword.split(' ').join('%'))
      setPopularMovies(query.results)
    }
  }

  // console.log(popularMovies)

  return (
    <div className="App">
      <header className="App-header">
        <h1>SANZ MOVIE MANIA</h1>
        <input 
          placeholder='cari film kesayangan...' 
          className='Movie-search'
          onChange={({ target }) => search(target.value)}
        />

        <div className='Movie-container'>
          {popularMovies.map((obj, i) => {
            return (
              <div className='Movie-wrapper' key={i}>
                <div className='Movie-title'>{obj.title}</div>
                <img className='Movie-image' src={`${process.env.REACT_APP_BASEIMGURL}/${obj.poster_path}`} />
                <div className='Movie-date'>release: {obj.release_date}</div>
                <div className='Movie-rate'>{obj.vote_average}</div>
              </div>
            )
          })}
        </div>
      </header>
    </div>
  );
}

export default App;

import React, { useReducer, useEffect } from 'react';
import { JokeData } from '../Types/Alltypes';
import { jokesReducer, initialJokes } from './jokecrud';
import { useFetchAndStore } from '../Hooks/UseFetch';
import './jokereducer.scss';

const JokeReducer: React.FC = () => {
  const [storedJokes, setStoredJokes] = useFetchAndStore('https://official-joke-api.appspot.com/jokes/ten', 'jokes', initialJokes);

  const [jokes, dispatch] = useReducer(jokesReducer, storedJokes);

  useEffect(() => {
    setStoredJokes(jokes);
  }, [jokes, setStoredJokes]);

  const updateRate = (id: number, rate: number) => {
    dispatch({ type: 'UPDATE_RATE', id, rate });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const jokeValue = (e.target as HTMLFormElement).querySelector('input[type="text"]')?.value || '';

    if (!jokeValue) {
      alert('Please enter a joke!');
      return; 
    } else {
      alert('Joke added successfully!');
    }

    dispatch({ type: 'ADD_JOKE', joke: jokeValue });
    (e.target as HTMLInputElement)[0].value = '';
  };

  const deleteJoke = (id: number) => {
    dispatch({ type: 'DELETE_JOKE', id });
  };

  const updateJoke = (id: number, joke: string) => {
    dispatch({ type: 'UPDATE_JOKE', id, joke });
  };

  return (
    <div className='container'>
      <h2>Jokes for you 💀</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder='Add a joke' />
        <button className='submit' type='submit'>Add Joke</button>
      </form>
      <div className="jokes">
        {jokes.sort((a, b) => b.rate - a.rate).map((joke) => (
          <div key={joke.id} className='joke'>
            <div className='joke-text'>{joke.joke}</div>
            <div className='text'>{joke.rate}</div>
            <div className="joke-buttons">
              <button className='updates' onClick={() => updateRate(joke.id, joke.rate + 1)}>👍</button>
              <button className='updates' onClick={() => updateRate(joke.id, joke.rate - 1)}>👎</button>
              <button className='del' onClick={() => deleteJoke(joke.id)}>Delete</button>
              <button className='up' onClick={() => updateJoke(joke.id, 'Updated joke')}>Update</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JokeReducer;

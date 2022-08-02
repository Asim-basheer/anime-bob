import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import axios from 'axios';
import { Button } from 'react-bootstrap';
const SEARCH_URI = 'https://bob-anime.herokuapp.com/anime/searchbyname/';

export const SearchInput = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const handleSearch = (query) => {
    setIsLoading(true);
    const fetchData = async () => {
      const { data } = await axios.get(SEARCH_URI + query);
      const options = data.map(({ name, img, anime_id }) => ({
        name,
        img,
        anime_id,
      }));
      setOptions(options);
      setIsLoading(false);
    };
    fetchData();
  };

  const handleClick = (anime_id, name) => {
    navigate(`/details/${anime_id}/${name}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { anime_id, name } = options[0];

    navigate(`/details/${anime_id}/${name}`);
  };

  const filterBy = () => true;

  return (
    <form onSubmit={handleSubmit} className='text-center'>
      <h1 className='display-5 mb-3 text-white'>Anime Search</h1>
      <AsyncTypeahead
        id='async-example'
        filterBy={filterBy}
        isLoading={isLoading}
        labelKey={(options) => `${options.name}`}
        minLength={1}
        onSearch={handleSearch}
        options={options}
        placeholder='Search for an anime...'
        clearButton
        className='mb-3'
        // size="sm"
        renderMenuItemChildren={(option, props) => (
          <div
            onClick={() => handleClick(option.anime_id, option.name)}
            className='my__link'
          >
            <img
              alt={option.name}
              src={option.img}
              style={{
                height: '24px',
                marginRight: '10px',
                width: '24px',
              }}
            />
            <span>{option.name}</span>
          </div>
        )}
      />
      <Button variant='primary' type='submit'>
        Anime Search
      </Button>
    </form>
  );
};

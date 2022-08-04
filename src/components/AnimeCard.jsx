import { Button, Image } from 'react-bootstrap';
import { AiFillStar } from 'react-icons/ai';
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addToFavorite,
  deleteFromFavorite,
  getFavorites,
} from '../store/anime/favoriteSlice';

function AnimeCard({ anime }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const { favorites } = useSelector((state) => state.favorite);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    anime_id,
    name,
    description,
    img,
    genre,
    premiered,
    scores,
    other_names,
    status,
    season,
    episodes_number,
  } = anime;

  const handleResult = (name, value) => {
    navigate(`/details/${value}/${name}`);
  };

  const handleNavigate = (name, value) => {
    navigate(`/result/${name}/${value}`);
  };

  const removeAndAddFavoriteHandler = (type, anime_id, user_id) => {
    const body = { anime_id, user_id };
    if (type === 'remove') {
      dispatch(deleteFromFavorite(body));
    } else if (type === 'add') {
      if (!user) {
        navigate('/login');
      }

      dispatch(addToFavorite(body));
    }

    dispatch(getFavorites());
  };

  const filter =
    favorites && favorites.filter((anime) => anime.anime_id === anime_id)[0];

  return (
    <div className='anime-card bg-dark pt-2 rounded'>
      <div className='anime-card__head mb-2'>
        <p className='anime-card__title text-center text-white mb-2 text-capitalize '>
          <button
            className='text-capitalize  anime-card__title-1 text-info'
            onClick={() => handleResult(name, anime_id)}
          >
            {name}
          </button>
          <span className='d-block text-center text-white-50 anime-card__title-2'>
            {other_names} &nbsp;
          </span>
        </p>
        <div className='anime-card__details text-white-50 p-1'>
          <span>
            {premiered} {season}
          </span>
          <span>{status}</span>
          <span>{episodes_number} eps</span>
        </div>
        <div className='anime-card__genres text-capitalize px-1'>
          {genre.map((g) => {
            return (
              <button
                className='anime-card__genre rounded-pill '
                key={g}
                onClick={() => handleNavigate('genre', g)}
              >
                {g}
              </button>
            );
          })}
        </div>
      </div>
      <div className='anime-card__body px-2 mb-2'>
        <div className='anime-card__img'>
          <Image
            src={img}
            fluid
            rounded
            alt={name}
            onClick={() => handleResult(name, anime_id)}
          />
        </div>
        <p className='anime-card__des text-white-50 m-0 px-1'>{description}</p>
      </div>
      <div className='anime-card__footer pt-2 pb-1 px-4'>
        <div className='anime-card__score text-white-50'>
          <AiFillStar
            className='anime-card__score-icon'
            style={{ color: '#FDCC0D' }}
          />{' '}
          {scores}
        </div>

        <div className='anime-card__favorite'>
          {anime_id === filter?.anime_id ? (
            <Button
              variant='primary'
              className='anime-card__favorite-item text-capitalize '
              size='sm'
              onClick={() =>
                removeAndAddFavoriteHandler('remove', anime_id, user?.user_id)
              }
            >
              <MdFavorite className='text-danger' /> remove from favorite
            </Button>
          ) : (
            <Button
              variant='primary'
              className='anime-card__favorite-item text-capitalize '
              size='sm'
              onClick={() =>
                removeAndAddFavoriteHandler('add', anime_id, user?.user_id)
              }
            >
              <MdOutlineFavoriteBorder /> add to favorite
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnimeCard;

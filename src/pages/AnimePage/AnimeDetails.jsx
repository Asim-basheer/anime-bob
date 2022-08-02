import { Image } from 'react-bootstrap';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function AnimeDetails({ anime }) {
  const navigate = useNavigate();
  const handleGenre = (name, value) => {
    // navigate(`/result/${JSON.stringify(id)}`);
    navigate(`/result/${name}/${value}`);
  };
  return (
    <div className='anime-details bg-dark py-3 px-2 d-block d-lg-flex gap-3 rounded'>
      <div>
        <Image
          src={anime?.img}
          alt={anime?.name}
          height={250}
          className='mb-2 mb-lg-0 mx-auto d-block  d-sm-none  d-lg-block '
        />
      </div>
      <div>
        <p className='text-capitalize '>
          <span className='d-block text-white fw-bolder fs-5'>
            {anime?.name}
          </span>
          <span className='text-white-50'>{anime?.other_names}</span>
        </p>
        <p className='anime-details__des text-white-50'>{anime?.description}</p>
        <ul className='anime-details__list text-white-50 p-0 text-capitalize'>
          <li>
            premiered :{' '}
            <span>
              {anime?.premiered} {anime?.season}
            </span>
          </li>
          <li>
            scores : <AiFillStar className='star-icon' />{' '}
            <span>{anime?.scores}</span>
          </li>
          <li>
            status : <span>{anime?.status}</span>
          </li>
          <li>
            genre : {''}
            {anime?.genre.map((genre, index) => {
              if (anime?.genre.length === index + 1) {
                return (
                  <button
                    className='anime-details__genre btn-link'
                    key={genre}
                    onClick={() => handleGenre('genre', genre)}
                  >
                    {genre}
                  </button>
                );
              }
              return (
                <button
                  className='anime-details__genre btn-link'
                  key={genre}
                  onClick={() => handleGenre('genre', genre)}
                >
                  {genre},
                </button>
              );
            })}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AnimeDetails;

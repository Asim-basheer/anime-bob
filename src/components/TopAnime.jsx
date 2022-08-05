import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Heading from './Heading';
import Spinner from '../components/Spinner';
function TopAnime() {
  const [top, setTop] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get(
        'https://bob-anime.herokuapp.com/anime/get/top'
      );
      setTop(data);
    };
    fetchData();
    setLoading(false);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='top-anime bg-dark text-white-50 p-3 rounded'>
      <Heading size='sm'>top anime</Heading>
      {top.map(({ anime_id, scores, name, img }, index) => {
        return (
          <Link
            className={`top-anime__box d-flex align-items-center ${
              index === 9 ? '' : 'mb-3'
            }`}
            to={`/details/${anime_id}/${name}`}
            key={index}
          >
            <span
              className={`top-anime__num me-2 ${
                index === 0
                  ? 'bg-white  text-dark active'
                  : 'border text-white-50'
              }  rounded fw-bold`}
            >
              {index + 1}
            </span>
            <img
              src={img}
              alt={name}
              className='me-2 rounded'
              style={{ width: '65px', height: '80px' }}
            />
            <div className='text-white-50'>
              <h3 className='top-name mb-1 fw-bold'>
                {name.length > 15 ? name.slice(0, 15) + '...' : name}
              </h3>
              <span className='fs-6'>
                <AiFillStar className='anime-card__score-icon star-icon star-icon' />{' '}
                {scores}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default TopAnime;

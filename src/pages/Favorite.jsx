import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import AnimeCard from '../components/AnimeCard';
import Heading from '../components/Heading';
import { useSelector } from 'react-redux';
function Favorite({ user }) {
  const navigate = useNavigate();

  const { favorites } = useSelector((state) => state.favorite);
  useEffect(() => {
    if (!user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  return (
    <>
      <Heading>
        your favorite{' '}
        <span className='text-info fw-bolder'>{user?.username}</span>
      </Heading>
      {favorites?.length > 0 ? (
        <Row className='g-3' xs={1} sm={2} md={3} lg={4}>
          {favorites.map((anime) => {
            return (
              <Col key={anime.anime_id}>
                <AnimeCard anime={anime} />
              </Col>
            );
          })}
        </Row>
      ) : (
        <h1 className='display-4 text-white'>
          Your favorite is empty lets add some{' '}
          <Link to={'/all'}>All nime </Link>
        </h1>
      )}
    </>
  );
}

export default Favorite;

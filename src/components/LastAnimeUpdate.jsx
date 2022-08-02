import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AnimeCard from './AnimeCard';
import Heading from './Heading';

function LastAnimeUpdate({ lastAnimes }) {
  return (
    <>
      <Heading>latest updated anime</Heading>
      <Row className='g-2 mb-2' xs={1} sm={2} lg={2} xl={3}>
        {lastAnimes.map((anime) => {
          return (
            <Col key={anime.anime_id}>
              <AnimeCard anime={anime} />
            </Col>
          );
        })}
      </Row>
      <div className='d-flex justify-content-end'>
        <Link
          className='btn btn-link btn-sm text-end text-capitalize'
          to={'/all'}
        >
          see more animes
        </Link>
      </div>
    </>
  );
}

export default LastAnimeUpdate;
